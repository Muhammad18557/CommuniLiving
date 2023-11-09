from amenity_booking.views import AmenitiesView, BookingView, DummyView
from django.urls import path, include
urlpatterns = [
    path('dummy/', DummyView.as_view(), name='dummy'),
    path('booking/', BookingView.as_view(), name='booking_view'), 
    path('booking/<int:amenity_id>', BookingView.as_view(), name='booking_view'),
    path('amenities/', AmenitiesView.as_view(), name='amenities'),
    path('amenities/<int:community_id>/', AmenitiesView.as_view(), name='amenities'),
]
