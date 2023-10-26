from django import forms
from django.forms import ModelForm

from .models import Booking

# Create a booking form
class BookingForm(ModelForm):
    class Meta:
        model = Booking
        fields = ('user', 'amenity', 'date', 'start_time', 'end_time')

        widgets = {
            'user': forms.TextInput(attrs={'class':'form-control'}),
            'amenity': forms.TextInput(attrs={'class':'form-control'}),
            'date': forms.TextInput(attrs={'class':'form-control'}),
            'start_time': forms.TextInput(attrs={'class':'form-control'}),
            'end_time': forms.TextInput(attrs={'class':'form-control'}),
        }