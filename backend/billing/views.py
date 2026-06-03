# billing/views.py

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Plan, Subscription
from decimal import Decimal


# Conversion rates relative to USD
CONVERSION_RATES = {
    "PKR": 280,
    "AED": 3.67,
    "USD": 1,
    "EUR": 0.93,
}


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_plans(request):
    user_profile = request.user.userprofile

    # You are already storing PKR / AED / USD
    currency = user_profile.country.upper()

    plans = Plan.objects.all()
    plans_data = []

    # fallback safety
    if currency not in CONVERSION_RATES:
        currency = "USD"

    for plan in plans:
        base_price_usd = plan.price  # assume stored in USD
        converted_price = round(
            base_price_usd * CONVERSION_RATES[currency], 2
        )

        plans_data.append({
            "id": plan.id,
            "name": plan.name,
            "price": converted_price,
            "currency": currency,
            "description": plan.description
        })

    return Response(plans_data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def checkout(request):
    plan_id = request.data.get("plan_id")

    try:
        plan = Plan.objects.get(id=plan_id)

        Subscription.objects.create(
            user=request.user,
            plan=plan
        )

        user_profile = request.user.userprofile
        user_profile.is_paid = True
        user_profile.save()

        return Response({"message": "Subscription activated"})

    except Plan.DoesNotExist:
        return Response({"error": "Plan not found"}, status=404)