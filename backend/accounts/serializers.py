from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile

class RegisterSerializer(serializers.ModelSerializer):
    country = serializers.CharField(write_only=True, required=True)
    email = serializers.EmailField(required=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email', 'country']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Extract country and email
        country = validated_data.pop('country')
        email = validated_data.pop('email')

        # Create user
        user = User.objects.create_user(
            username=validated_data['username'],
            email=email,
            password=validated_data['password']
        )

        # Map currency based on country
        if country == "PKR":
            currency = "PKR"
        elif country == "AED":
            currency = "AED"
        else:
            currency = "USD"

        # Create user profile with correct currency
        UserProfile.objects.create(
            user=user,
            country=country,
            currency=currency,
            basic_count=15,
            deep_count=1,
            is_paid=False
        )

        return user


class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')

    class Meta:
        model = UserProfile
        fields = ['username', 'country', 'currency', 'basic_count', 'deep_count', 'is_paid']