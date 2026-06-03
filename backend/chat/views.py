import json
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import ChatLog
from .serializers import ChatLogSerializer
from .retrieval import search_ifrs
from .auditor_ai import generate_auditor_focus
from .deep_analysis import generate_deep_analysis

ALLOWED_IFRS = ["IFRS9","IFRS16","IFRS17","IFRS18"]

def is_scenario_question(question):
    scenario_keywords = [
        "entity","company","acquire","acquisition","merge","merger",
        "if ","suppose","assume","how should","treatment","accounting for",
        "recognize","measure","journal entry","scenario","case","example"
    ]
    q = question.lower()
    return any(word in q for word in scenario_keywords)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def ifrs_chatbot(request):
    data = request.data
    standard = data.get("standard")
    question = data.get("question")
    mode = data.get("mode","basic")

    if not standard or not question:
        return Response({"error":"Missing standard or question"}, status=400)

    if standard.upper() not in ALLOWED_IFRS:
        return Response({"error":"Standard not supported"}, status=400)

    profile = request.user.userprofile

    # ===== BASIC MODE =====
    if mode=="basic":
        if profile.basic_count <= 0 and not profile.is_paid:
            return Response({
                "error":"Basic mode limit reached. Please subscribe for more.",
                "remaining_basic": profile.basic_count
            })
        if is_scenario_question(question):
            return Response({
                "mode":"restricted",
                "message":"Scenario-based question. Switch to Deep Analysis Mode.",
                "remaining_basic": profile.basic_count
            })

        result = search_ifrs(standard.lower(), question)
        if not result:
            return Response({
                "mode":"restricted",
                "message":"Query not found in IFRS document. Use Deep Analysis Mode.",
                "remaining_basic": profile.basic_count
            })

        auditor_focus = generate_auditor_focus(result["text"])

        ChatLog.objects.create(
            user=request.user,
            standard=result["standard"],
            question=question,
            answer=result["text"],
            paragraph_id=result["para_id"],
            auditor_focus=str(auditor_focus),
        )

        # Update remaining basic count
        if not profile.is_paid:
         profile.basic_count -= 1
         profile.save()

        return Response({
            "mode":"basic",
            "answer": result["text"],
            "reference": f'{result["standard"]} - {result["section"]} (ID: {result["para_id"]})',
            "auditor_focus": auditor_focus,
            "remaining_basic": profile.basic_count,
            "disclaimer":"Strictly extracted from IFRS document. For educational use only."
        })

    # ===== DEEP MODE =====
    elif mode=="deep":
        if profile.deep_count <= 0 and not profile.is_paid:
            return Response({
                "error":"Deep analysis requires subscription",
                "remaining_deep": profile.deep_count
            })

        deep_text = generate_deep_analysis(question)

        ChatLog.objects.create(
            user=request.user,
            standard=standard,
            question=question,
            answer=deep_text,
            paragraph_id="DEEP_MODE",
            auditor_focus="Deep Analysis Mode",
            deep_analysis={"text": deep_text}  # keep JSONField happy
        )

        # Update remaining deep count if not paid
        if not profile.is_paid:
            profile.deep_count -= 1
            profile.save()

        return Response({
            "mode":"deep",
            "deep_analysis": deep_text,
            "remaining_deep": profile.deep_count,
            "disclaimer":"AI-generated technical interpretation."
        })

    else:
        return Response({"error":"Invalid mode"})
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def chat_history(request):
    logs = ChatLog.objects.filter(user=request.user).order_by('-created_at')  # latest first
    data = [{
        "id": log.id,
        "standard": log.standard,
        "question": log.question,
        "answer": log.answer,
        "mode": log.mode,
        "created_at": log.created_at
    } for log in logs]
    return Response(data)  

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def chat_history(request):
    chats = ChatLog.objects.filter(user=request.user).order_by('-created_at')
    serializer = ChatLogSerializer(chats, many=True)
    return Response(serializer.data)