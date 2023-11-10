from django.shortcuts import render 
from rest_framework.views import APIView 
from . models import *
from rest_framework.response import Response 
from . serializers import *

from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny

from rest_framework import status

# Dummy view to test the connection between the frontend and the backend
# Feel free to edit this to test new api endpoints
class DummyView(APIView):
    authentication_classes = []  # No authentication
    permission_classes = [AllowAny]  # Allow any user to access
    # permission_classes = (IsAuthenticated, )
    def get(self, request):
        # Example of returning a simple JSON response
        dummy_data = {
            "key": "value",
            "text": "This is to test the connection between the frontend and the backend."
        }
        return Response(dummy_data)

    def post(self, request):
        pass

class AmenitiesView(APIView):
    """Returns a list of all amenities in the database for the given shared space."""
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [AllowAny]

    def get(self, request, community_id=None):
        if community_id:
            amenities = Amenity.objects.filter(community__id=community_id) # return amenities for the given shared space
        else:
            amenities = Amenity.objects.all() # return all amenities in the database
        serializer = AmenitySerializer(amenities, many=True)  # Serialize the queryset
        return Response(serializer.data)


class BookingView(APIView): 

    serializer_class = BookingSerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [AllowAny] # [IsAuthenticated ] User must be authenticated to make a booking
  
    def get(self, request, amenity_id=None):
        """Returns a list of all bookings in the database for a user."""
        """Or Returns a list of all bookings in the database for the given amenity if amenity id is provided."""
        if amenity_id:
            bookings = Booking.objects.filter(amenity=amenity_id)
        else:
            user = request.user
            bookings = Booking.objects.filter(user=user.id)
        serializer = BookingSerializer(bookings, many=True)
        return Response(serializer.data)
  
    def post(self, request): 
        serializer = BookingSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            # check if the amenity is already booked
            if Booking.objects.filter(amenity=request.data['amenity'], date=request.data['date'], start_time=request.data['start_time'], end_time=request.data['end_time']).exists():
                return Response("The amenity is already booked", status=status.HTTP_400_BAD_REQUEST)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 


class LogoutView(APIView):
     permission_classes = (IsAuthenticated,)
     def post(self, request):
          
          try:
               refresh_token = request.data["refresh_token"]
               token = RefreshToken(refresh_token)
               token.blacklist()
               return Response(status=status.HTTP_205_RESET_CONTENT)
          except Exception as e:
               return Response(status=status.HTTP_400_BAD_REQUEST)
        