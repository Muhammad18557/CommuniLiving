# from django.urls import path
# from .views import YourModelAPIView
from amenity_booking.views import AmenityView, BookingView, DummyView
from django.urls import path, include
urlpatterns = [
    path('dummy/', DummyView.as_view(), name='dummy'),
    path('amenity/', AmenityView.as_view(), name='amenity_view'),
    path('booking/', BookingView.as_view(), name='booking_view'), # erroneous
]
