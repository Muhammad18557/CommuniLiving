from django import forms
from django.forms import ModelForm
from django.contrib.auth.models import User

from .models import Booking
from .models import Amenity

# Create a booking form
class BookingForm(ModelForm):
    def __init__(self, *args, **kwargs):
        super(BookingForm, self).__init__(*args, **kwargs)

        # Fetch choices dynamically from the Amenity model
        user_choices = [(user.id, user.username) for user in User.objects.all()]
        amenity_choices = [(amenity.id, amenity.name) for amenity in Amenity.objects.all()]

        # Set the choices for the 'amenity' field
        self.fields['user'] = forms.ModelChoiceField(queryset=User.objects.all(), label='User', empty_label="Select a user", widget=forms.Select(attrs={'class': 'form-control'}))

        self.fields['amenity'] = forms.ChoiceField(choices=amenity_choices,
                                                   widget=forms.Select(attrs={'class': 'form-control'}))

    class Meta:
        model = Booking
        fields = ('user', 'amenity', 'date', 'start_time', 'end_time')

        widgets = {
            # 'user': forms.ChoiceField(choices=User.objects.all(), widget=forms.Select(attrs={'class': 'form-control'})),
            # 'user': forms.TextInput(attrs={'class':'form-control'}),
            # 'amenity': forms.Select(options=Amenity.objects.all(), attrs={'class': 'form-control'}),
            'date': forms.DateTimeInput(attrs={'class':'form-control', 'type': 'date'}),
            'start_time': forms.DateTimeInput(attrs={'class':'form-control', 'type': 'time'}),
            'end_time': forms.DateTimeInput(attrs={'class':'form-control', 'type': 'time'}),
        }