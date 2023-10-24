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
from django.urls import path
import amenity_booking.views as amenity_booking
from core.views import index, contact

urlpatterns = [
    path('', index, name='index'),
    path('contact/', contact, name='contact'),
    path('admin/', admin.site.urls),
    path('book/', amenity_booking.book_amenity, name='book_amenity'),
    path('booking_success/', amenity_booking.booking_success, name='booking_success')
]
