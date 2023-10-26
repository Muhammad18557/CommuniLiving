from django.db import models
from django.contrib.auth.models import User

class Amenity(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    # amenity = models.ForeignKey(Amenity, on_delete=models.CASCADE)
    amenity = models.CharField(max_length=100)
    date = models.DateField('Date')
    start_time = models.TimeField('Start Time')
    end_time = models.TimeField('End Time')