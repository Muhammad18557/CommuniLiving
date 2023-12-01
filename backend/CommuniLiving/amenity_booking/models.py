from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
import random

class UserProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    # Add any additional fields here
    communities = models.ManyToManyField('Community', related_name='user_profiles', blank=True)

    # def save(self, *args, **kwargs):
    #     # Override the save method to prevent adding communities by default
    #     if not self.pk:
    #         self.communities.clear()  # Clear any existing communities when creating a new profile
    #     super().save(*args, **kwargs)

    def __str__(self):
        return self.user.username + " - " + self.user.email + " - " + str(self.user.id)

    # def add_community(self, community):
    #     self.communities.add(community)
    #     return f"Community '{community.name}' added to user '{self.user.username}'"

    # def remove_community(self, community):
    #     self.communities.remove(community)
    #     return f"Community '{community.name}' removed from user '{self.user.username}'"

    def get_communities(self):
        return self.communities.all()

class Community(models.Model):
    """A cummunity is an apartment/suite etc that has multiple amenities."""
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    location = models.TextField(blank=True, null=True)
    join_pass = models.CharField(max_length=6, default=''.join([str(random.randint(0, 9)) for _ in range(6)]), unique=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.id} - {self.name}"
    
class Amenity(models.Model):
    """An amenity is a resource that can be booked."""
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    community = models.ForeignKey(Community, on_delete=models.CASCADE, default=1)

    def __str__(self):
        return self.name

class Booking(models.Model):
    """A booking is a reservation of an amenity by a user."""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amenity = models.ForeignKey(Amenity, on_delete=models.CASCADE)
    date = models.DateField('Date')
    start_time = models.TimeField()
    end_time = models.TimeField()
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.amenity.name} booked by {self.user.username}"

    def __str__(self):
        return f"{self.amenity.name} booked by {self.user.username}"


class Message(models.Model):
    """A Message is a reservation of an amenity by a user."""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField('Date')
    community = models.ForeignKey(Community, on_delete=models.CASCADE, default=1)
    message = models.TextField(blank=True)

