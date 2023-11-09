# from django.http import HttpResponse
# from django.shortcuts import render
# from django.http import HttpResponseRedirect
# from .models import Booking
# from .forms import BookingForm

# def add_booking(request):
#     submitted = False
#     if request.method == 'POST':
#         form = BookingForm(request.POST)
#         if form.is_valid():
#             form.save()
#             return HttpResponseRedirect('/add_booking?submitted=True')
#     else:
#         form = BookingForm()
#         if 'submitted' in request.GET:
#             submitted = True
#     return render(request, 'add_booking.html', {'form':form, 'submitted':submitted})

# def all_bookings(request):
#     bookings = Booking.objects.all()
#     return render(request, 'all_bookings.html', {'bookings': bookings})

# # ------------------------------------------------------------------------------------
from django.shortcuts import render 
from rest_framework.views import APIView 
from . models import *
from rest_framework.response import Response 
from . serializers import *

from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny

from rest_framework import status

class AmenityView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny]

    def get(self, request):
        # amenities = Amenity.objects.all()  # Retrieve all amenities from the database
        # amenity_names = [amenity.name for amenity in amenities]  # Assuming 'name' is the field representing amenity names
        # return Response(amenity_names)  # Return the list of amenity names as a JSON response
        amenities = Amenity.objects.all()
        serializer = AmenitySerializer(amenities, many=True)  # Serialize the queryset
        return Response(serializer.data)


class BookingView(APIView): 
    
    serializer_class = BookingSerializer
  
    def get(self, request): 
        detail = {"name": detail.name,"detail": detail.detail}  
        # for detail in React.objects.all()] 
        return Response(detail) 
  
    def post(self, request): 
  
        serializer = BookingSerializer(data=request.data) 
        if serializer.is_valid(raise_exception=True): 
            serializer.save() 
            return  Response(serializer.data) 


class DummyView(APIView):
    authentication_classes = []  # No authentication
    permission_classes = [AllowAny]  # Allow any user to access
    def get(self, request):
        # Example of returning a simple JSON response
        dummy_data = {
            "key": "value",
            "text": "This is to test the connection between the frontend and the backend."
        }
        return Response(dummy_data)

    def post(self, request):
        # Handle POST request
        pass