from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from rest_framework.response import Response
from .serializers import *
from rest_framework import permissions
from django.contrib import auth
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.utils.decorators import method_decorator
import json
from datetime import date, timedelta
from .forms import SignupForm
from django.views.decorators.csrf import csrf_exempt, csrf_protect

# from django.shortcuts import render 
# from rest_framework.views import APIView 
# from . models import *
# from rest_framework.response import Response 
# from . serializers import *
# from rest_framework import permissions
# from django.contrib import auth
# from rest_framework.response import Response
# from .serializers import UserSerializer
# from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
# from django.utils.decorators import method_decorator
# from django.http import JsonResponse
# from django.contrib.auth.models import User
# from django.contrib.auth import authenticate
# from rest_framework_simplejwt.tokens import RefreshToken
# from rest_framework.authentication import SessionAuthentication, BasicAuthentication
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.permissions import AllowAny
# from rest_framework import status
# from rest_framework.decorators import api_view
# from django.contrib.auth import authenticate, login, logout
# from django.http import JsonResponse
# from django.middleware.csrf import get_token
# from django.views.decorators.csrf import csrf_exempt
# import json
# from django.http import JsonResponse
# from .forms import SignupForm
# from datetime import date, timedelta


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

class MessageView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [AllowAny]

    def get(self, request, community_id=None):
        """Returns all bookings for a specific day."""
        # if 'community' not in request.query_params:
        #     return Response({"error": "Community parameter is missing"}, status=status.HTTP_400_BAD_REQUEST)

        # try:
        #     community = parse_date(request.query_params['community'])
        # except ValueError:
        #     return Response({"error": "Invalid community format"}, status=status.HTTP_400_BAD_REQUEST)
        community_id = 1

        if community_id:
            messages = Message.objects.filter(community=community_id)
        else:
            return Response({"error": "Community ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = MessageSerializer(messages, many=True)
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
#         try:
#             data = json.loads(request.body.decode('utf-8'))
#             username = data['name']
#             email = data['email']
#             password = data['password']
#             print(username, email, password)
#             User.objects.create_user(username=username, email=email, password=password)
#             return JsonResponse({'status': 'success', 'user_id': user.id}, status=201)
#         except json.JSONDecodeError as e:
#             return JsonResponse({'status': 'error', 'message': 'Invalid JSON format'}, status=400)
#     else:
#         return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=400)

# class SignupView(APIView):
#     permission_classes = (permissions.AllowAny, )

#     def post(self, request, *args, **kwargs):
#     #     print("here")
#     #     serializer = SignupSerializer(data=request.data)
#     #     print(serializer)

#     #     # if serializer.is_valid():
#     #     username = serializer.validated_data['username']
#     #     email = serializer.validated_data['email']
#     #     password = serializer.validated_data['password']
#     #     re_password = serializer.validated_data['re_password']

#     #     if password != re_password:
#     #         return Response({'error': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)

#     #     if len(password) < 6:
#     #         return Response({'error': 'Password must be at least 6 characters'}, status=status.HTTP_400_BAD_REQUEST)

#     #     if User.objects.filter(username=username).exists():
#     #         return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

#     #     user = User.objects.create_user(username=username, password=password)
#     #     print("here_now")

#     #     user_profile = UserProfile.objects.create(user=user, communities='')

#     #     return Response({'success': 'User created successfully'}, status=status.HTTP_201_CREATED)

#         # return Response({'error': 'Invalid data provided'}, status=status.HTTP_400_BAD_REQUEST)
#         try:
#             # Read and parse JSON data from the request body
#             data = json.loads(request.body.decode('utf-8'))

#             username = data['username']
#             email = data['email']
#             password = data['password']
#             re_password = data['re_password']

#             serializer = SignupSerializer(data=data)
#             print(serializer)

#             # if serializer.is_valid():
#             #     username = serializer.validated_data['username']
#             #     password = serializer.validated_data['password']
#             #     re_password = serializer.validated_data['re_password']

#             if serializer.is_valid():
#                 username = serializer.validated_data['username']
#                 email = serializer.validated_data['email']
#                 password = serializer.validated_data['password']
#                 re_password = serializer.validated_data['re_password']

#             if password != re_password:
#                 return Response({'error': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)

#             if len(password) < 6:
#                 return Response({'error': 'Password must be at least 6 characters'}, status=status.HTTP_400_BAD_REQUEST)

#             if User.objects.filter(username=username).exists():
#                 return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)


#             user = User.objects.create_user(username=username, password=password)

#             user_profile = UserProfile.objects.create(user=user)

#             # if user is not None:
#                 # login(request, user)
#             return JsonResponse({'status': 'success'})
#             # else:
#                 # return JsonResponse({'status': 'error', 'message': 'Invalid credentials'})
#         except json.JSONDecodeError as e:
#             return JsonResponse({'status': 'error', 'message': 'Invalid JSON format'})
#         else:
#             return JsonResponse({'status': 'error', 'message': 'Invalid request method'})

@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (AllowAny, )

    def get(self, request, format=None):
        return Response({ 'success': 'CSRF cookie set' })

#--
# # @method_decorator(ensure_csrf_cookie, name='dispatch')
# class SignupView(APIView):
#     permission_classes = (AllowAny, )

#     def post(self, request, *args, **kwargs):
#         try:
#             # Read and parse JSON data from the request body
#             data = json.loads(request.body.decode('utf-8'))
#             print(data)

#             username = data['username']
#             email = data['email']
#             password = data['password']
#             re_password = data['re_password']

#             serializer = SignupSerializer(data=data)

#             # Validate the serializer
#             if serializer.is_valid():
#                 username = serializer.validated_data['username']
#                 email = serializer.validated_data['email']
#                 password = serializer.validated_data['password']
#                 re_password = serializer.validated_data['re_password']
#             else:
#                 print("Validation errors:", serializer.errors)
#                 return Response({'error': 'Invalid data provided'}, status=status.HTTP_400_BAD_REQUEST)

#             print("Received data:", data)

#             if password != re_password:
#                 return Response({'error': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)

#             if len(password) < 6:
#                 return Response({'error': 'Password must be at least 6 characters'}, status=status.HTTP_400_BAD_REQUEST)

#             if User.objects.filter(username=username).exists():
#                 return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

#             # Create the user
#             user = User.objects.create_user(username=username, password=password)
#             print("User created:", user)

#             # Create the user profile
#             user_profile = UserProfile.objects.create(user=user)
#             print("User profile created:", user_profile)

#             # Return a success response
#             return JsonResponse({'status': 'success'})
        
#         except json.JSONDecodeError as e:
#             print("JSONDecodeError:", e)
#             return JsonResponse({'status': 'error', 'message': 'Invalid JSON format'})

#         except Exception as e:
#             print("Exception:", e)
#             return JsonResponse({'status': 'error', 'message': 'An unexpected error occurred'})
## --
    # def get(self, request, *args, **kwargs):
    #     # Implement your logic for handling GET requests (if needed)
    #     return JsonResponse({'status': 'success', 'message': 'GET request received'})

    # def options(self, request, *args, **kwargs):
    #     """
    #     Handle OPTIONS requests by returning appropriate CORS headers.
    #     """
    #     response = HttpResponse()
    #     response["Access-Control-Allow-Origin"] = "*"  # Update with your allowed origins
    #     response["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS"
    #     response["Access-Control-Allow-Headers"] = "Content-Type, X-CSRFToken"  # Add any other required headers
    #     response["Access-Control-Max-Age"] = "86400"  # Cache preflight results for 24 hours
    #     return response

    # def options(self, request, *args, **kwargs):
    #     # Handle OPTIONS request
    #     # response = HttpResponse()
    #     # response['allow'] = ",".join(['POST', 'OPTIONS'])
    #     # return response
    #     return JsonResponse({'status': 'success'})

    # def get(self, request, *args, **kwargs):
    #     # # Handle get request
    #     # response = HttpResponse()
    #     # response['allow'] = ",".join(['POST', 'OPTIONS'])
    #     # return response
    #     return JsonResponse({'status': 'success'})


# from rest_framework_simplejwt.views import TokenObtainPairView

# class MyTokenObtainPairView(TokenObtainPairView):
#     serializer_class = MyTokenObtainPairSerializer

#     def post(self, request, *args, **kwargs):
#         response = super().post(request, *args, **kwargs)
#         # Customize the response if needed
#         # response.data['username'] = request.username
#         # return response
#         print(request)
#         return response

@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def SignupView(request):
    # data = json.loads(request.body.decode('utf-8'))
    data = request.data

    username = data['username']
    email = data['email']
    password = data['password']
    re_password = data['re_password']
    serializer = SignupSerializer(data=data)
    if serializer.is_valid():
        username = serializer.validated_data['username']
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        re_password = serializer.validated_data['re_password']
    else:
        print("Validation errors:", serializer.errors)
        return Response({'error': 'Invalid data provided'}, status=status.HTTP_400_BAD_REQUEST)

    if password != re_password:
        return Response({'error': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)

    if len(password) < 6:
        return Response({'error': 'Password must be at least 6 characters'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password)

    # Create the user profile
    user_profile = UserProfile.objects.create(user=user)

    # Return a success response
    return Response({'status': 'success'}, status=status.HTTP_201_CREATED)


from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile(request):
    user = request.user
    profile = user.profile
    serializer = UserSerializer(profile, many=False)
    return Response(serializer.data)
