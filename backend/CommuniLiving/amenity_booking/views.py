from django.shortcuts import render 
from rest_framework.views import APIView 
from . models import *
from rest_framework.response import Response 
from . serializers import *

from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny

from rest_framework import status
from rest_framework.decorators import api_view


from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.middleware.csrf import get_token

from django.views.decorators.csrf import csrf_exempt

import json
from django.http import JsonResponse

from .forms import SignupForm
from datetime import date, timedelta


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

class TimeTableView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [AllowAny]

    def get(self, request, amenity_id=None):
        """Returns all bookings for a specific day."""
        curr_date = str(date.today()-timedelta(days=2))
        print(curr_date)
        # if 'date' not in request.query_params:
        #     return Response({"error": "Date parameter is missing"}, status=status.HTTP_400_BAD_REQUEST)

        # try:
        #     date = parse_date(request.query_params['date'])
        # except ValueError:
        #     return Response({"error": "Invalid date format"}, status=status.HTTP_400_BAD_REQUEST)

        if amenity_id:
            bookings = Booking.objects.filter(amenity=amenity_id, date=curr_date)
        else:
            user = request.user
            bookings = Booking.objects.filter(date=curr_date)

        serializer = BookingSerializer(bookings, many=True)
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
        """ Creates a new booking in the database for an amenity."""
        print(request.user)
        # hard coding user for now, to be session authenticated later
        request.data['user'] = 1
        serializer = BookingSerializer(data=request.data)
        amenityId = request.data['amenity']
        date = request.data['date']
        start_time = request.data['start_time']
        end_time = request.data['end_time']

        if serializer.is_valid(raise_exception=True):
            print("serializer is valid")
            # print(serializer.validated_data)
            # check if the amenity is already booked
            if Booking.objects.filter(amenity__id=amenityId, date=date, start_time=start_time, end_time=end_time).exists():
                return Response("The amenity is already booked", status=status.HTTP_400_BAD_REQUEST)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

# @csrf_exempt
# def register_user(request):
#     print("here")
#     serializer = UserSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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

@csrf_exempt
def LoginView(request):
    if request.method == 'POST':
        try:
            # Read and parse JSON data from the request body
            data = json.loads(request.body.decode('utf-8'))
            username = data['username']
            password = data['password']

            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request, user)
                return JsonResponse({'status': 'success'})
            else:
                return JsonResponse({'status': 'error', 'message': 'Invalid credentials'})
        except json.JSONDecodeError as e:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON format'})
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'})

@csrf_exempt
def logout_view(request):
    logout(request)
    return JsonResponse({'status': 'success'})

@csrf_exempt
def user_info(request):
    if request.user.is_authenticated:
        return JsonResponse({'username': request.user.username})
    else:
        return JsonResponse({'username': None})

# @csrf_exempt
# def register_user(request):
#     if request.method == 'POST':
#         form = SignupForm(request.POST)
#         if form.is_valid():
#             username = form.cleaned_data.get('username')
#             email = form.cleaned_data.get('email')
#             password = form.cleaned_data.get('password')
#             User.objects.create_user(username=username, email=email, password=password)
#             return redirect('edit-profile')
#         else:
#             form = SignupForm()

#         context = {
#             'form':form,
#         }

#     return render(request, 'registration/signup.html', context)

@csrf_exempt
def register_user(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            username = data['name']
            email = data['email']
            password = data['password']
            print(username, email, password)
            User.objects.create_user(username=username, email=email, password=password)
            return JsonResponse({'status': 'success', 'user_id': user.id}, status=201)
        except json.JSONDecodeError as e:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON format'}, status=400)
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=400)