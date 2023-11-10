from django.shortcuts import render
from .forms import SignUpForm

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

# class LoginView(APIView):
#     authentication_classes = (TokenAuthentication,)

#     def post(self, request, format=None):
#         username = request.data.get('username')
#         password = request.data.get('password')

#         # Perform user authentication (customize based on your user model)
#         user = authenticate(username=username, password=password)

#         if user:
#             _, token = AuthToken.objects.create(user)
#             return Response({'token': token}, status=status.HTTP_200_OK)
#         else:
#             return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

# Create your views here.

def index(request):
    return render(request, 'core/index.html')

def contact(request):
    return render(request, 'core/contact.html')

# def signup(request):
#     if request.method == 'POST':
#         form = SignUpForm(request.POST)
#         if form.is_valid():
#             form.save()
#             return redirect('index')  # Redirect to a page indicating sign-up success
#     else:
#         form = SignUpForm()

#     return render(request, '../templates/registration/signup.html', {'form': form})
