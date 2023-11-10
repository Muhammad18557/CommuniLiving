"""
URL configuration for CommuniLiving project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
# from amenity_booking.views import add_booking, all_bookings
from amenity_booking.views import AmenitiesView, BookingView
from rest_framework.authtoken.views import obtain_auth_token  # Import for token authentication
from core.views import index, contact #, signup, LoginView

urlpatterns = [
    path('', index, name='index'),
    path("accounts/", include("django.contrib.auth.urls")),
    # path('accounts/signup/', signup, name='signup'),
    path('contact/', contact, name='contact'),
    path('admin/', admin.site.urls),
    # path('api/your-data/', YourModelAPIView.as_view(), name='your-data-api'),

    # path('add_booking/', add_booking, name='add_booking'),
    # path('amenity_booking/', include('amenity_booking.urls')),
    # path('all-bookings/', all_bookings, name='all_bookings'),
    # path('api/booking/', BookingView.as_view(), name="booking_view"),
    # # path('api/amenity/', AmenityView.as_view(), name="amenity_view"),
    # path('api/accounts/signup/', signup, name='signup'),
    path('api/', include('amenity_booking.urls')),
]