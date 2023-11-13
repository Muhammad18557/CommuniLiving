from rest_framework import serializers
from .models import *

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
        
