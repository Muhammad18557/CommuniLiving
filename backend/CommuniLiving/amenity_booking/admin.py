from django.contrib import admin
from .models import Amenity, Booking, Community, UserProfile

admin.site.register(Amenity)
admin.site.register(Booking)
admin.site.register(Community)
admin.site.register(UserProfile)