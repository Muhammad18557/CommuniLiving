from django.contrib import admin
from .models import Amenity, Booking, Community, UserProfile, Message

admin.site.register(Amenity)
admin.site.register(Booking)
admin.site.register(Community)
admin.site.register(UserProfile)
admin.site.register(Message)