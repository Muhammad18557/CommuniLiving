from django.db import models
from django.contrib.auth.models import User

class Amenity(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amenity = models.ForeignKey(Amenity, on_delete=models.CASCADE)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
