from django.urls import path
from .views import YourModelAPIView

urlpatterns = [
    path('api/your-data/', YourModelAPIView.as_view(), name='your-data-api'),
    # Other URL patterns for your app...
]