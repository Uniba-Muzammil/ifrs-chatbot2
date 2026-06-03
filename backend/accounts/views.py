from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.http import JsonResponse
from .serializers import RegisterSerializer, UserProfileSerializer
from rest_framework_simplejwt.tokens import RefreshToken

# -------------------------------
# REGISTER
# -------------------------------
@api_view(['POST'])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message":"User registered successfully"}, status=201)
    return Response(serializer.errors, status=400)

# -------------------------------
# LOGIN (JWT in httpOnly cookie)
# -------------------------------
@api_view(['POST'])
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    user = User.objects.filter(username=username).first()

    if user and user.check_password(password):
        refresh = RefreshToken.for_user(user)
        res = JsonResponse({
            "message": "Login successful",
            "user_id": user.id,
            "username": user.username,
            "country": user.userprofile.country,
            "currency": user.userprofile.currency,
        })
        # Set JWT in httpOnly cookies
        res.set_cookie(
            key='access_token',
            value=str(refresh.access_token),
            httponly=True,
            secure=False,  # True if using HTTPS in production
            samesite='Lax'
        )
        res.set_cookie(
            key='refresh_token',
            value=str(refresh),
            httponly=True,
            secure=False,
            samesite='Lax'
        )
        return res

    return Response({"error":"Invalid credentials"}, status=401)

# -------------------------------
# LOGOUT
# -------------------------------
@api_view(['POST'])
def logout(request):
    res = JsonResponse({"message": "Logged out"})
    res.delete_cookie("access_token")
    res.delete_cookie("refresh_token")
    return res

# -------------------------------
# CURRENT USER (check session)
# -------------------------------
@api_view(['GET'])
def current_user(request):
    if not request.user.is_authenticated:
        return Response({"user": None}, status=200)
    profile = request.user.userprofile
    return Response({
        "user": {
            "id": request.user.id,
            "username": request.user.username,
            "country": profile.country,
            "currency": profile.currency,
        }
    })

# -------------------------------
# PROFILE (optional)
# -------------------------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    profile = request.user.userprofile
    serializer = UserProfileSerializer(profile)
    return Response(serializer.data)