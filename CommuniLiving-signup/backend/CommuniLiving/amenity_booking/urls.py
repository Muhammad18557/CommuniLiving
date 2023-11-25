from amenity_booking.views import AmenitiesView, BookingView, DummyView, LoginView, SignupView, logout_view, user_info, TimeTableView, MessageView, GetCSRFToken, MyTokenObtainPairView, get_profile
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('dummy/', DummyView.as_view(), name='dummy'),
    path('bookings/', BookingView.as_view(), name='booking_view'), 
    path('bookings/<int:amenity_id>', BookingView.as_view(), name='booking_view'),
    path('amenities/', AmenitiesView.as_view(), name='amenities'),
    path('amenities/<int:community_id>/', AmenitiesView.as_view(), name='amenities'),
    # path('token/', jwt_views.TokenObtainPairView.as_view(), name ='token_obtain_pair'),
    path('token/', MyTokenObtainPairView.as_view(), name ='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name ='token_refresh'),
    path('get_profile/', get_profile, name ='get_profile'),
    # path('restricted/', RestrictedView.as_view(), name ='restricted'),
    path('login/', LoginView, name ='login'),
    path('logout/', logout_view, name ='logout'),
    path('user_info/', user_info, name ='user_info'),
    path('timetable/', TimeTableView.as_view(), name ='timetable'),
    # path('signup/', SignupView.as_view(), name='register_user'),
    path('signup/', SignupView, name='register_user'),
    path('message/', MessageView.as_view(), name='messages'),
    path('csrf_cookie/', GetCSRFToken.as_view(), name='csrf_cookie'),
]
