from amenity_booking.views import AmenitiesView, BookingView, DummyView, LogoutView
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('dummy/', DummyView.as_view(), name='dummy'),
    path('booking/', BookingView.as_view(), name='booking_view'), 
    path('booking/<int:amenity_id>', BookingView.as_view(), name='booking_view'),
    path('amenities/', AmenitiesView.as_view(), name='amenities'),
    path('amenities/<int:community_id>/', AmenitiesView.as_view(), name='amenities'),
    path('token/', jwt_views.TokenObtainPairView.as_view(), name ='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name ='token_refresh'),
    path('logout/', LogoutView.as_view(), name ='logout'),
]
