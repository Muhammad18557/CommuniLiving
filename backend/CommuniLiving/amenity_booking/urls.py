from amenity_booking.views import AmenitiesView, BookingView, DummyView, LoginView, logout_view, user_info, SignupView, TimeTableView, MessageView, AddUserCommunity, getUserCommunities, addAmenity
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('dummy/', DummyView.as_view(), name='dummy'),
    path('bookings/', BookingView.as_view(), name='booking_view'), 
    path('bookings/<int:amenity_id>', BookingView.as_view(), name='booking_view'),
    path('amenities/', AmenitiesView.as_view(), name='amenities'),
    path('amenities/<int:community_id>/', AmenitiesView.as_view(), name='amenities'),
    # path('token/', jwt_views.TokenObtainPairView.as_view(), name ='token_obtain_pair'),
    # path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name ='token_refresh'),
    # path('restricted/', RestrictedView.as_view(), name ='restricted'),
    path('add_user_community/', AddUserCommunity, name='add_user_community'),
    path('login/', LoginView, name ='login'),
    path('logout/', logout_view, name ='logout'),
    path('user_info/', user_info, name ='user_info'),
    path('timetable/', TimeTableView.as_view(), name ='timetable'),
    path('signup/', SignupView, name='register_user'),
    path('message/', MessageView, name='messages'),
    path('get_user_communities/', getUserCommunities, name='getUserCommunities'),
    path('addAmenity/', addAmenity, name='addAmenity'),
]
