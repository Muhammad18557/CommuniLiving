from rest_framework import serializers
from .models import *

from django.contrib.auth import get_user_model

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'email', 'password')  # Include other fields as needed
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = get_user_model().objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class AmenitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Amenity
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'
    
    def create(self, validated_data):
        return Booking.objects.create(**validated_data)

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'
    
    def create(self, validated_data):
        return Message.objects.create(**validated_data)

class SignupSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    email = serializers.CharField(max_length=150)
    password = serializers.CharField(write_only=True)
    re_password = serializers.CharField(write_only=True)
        
