from django import forms
from django.forms import ModelForm
from django.contrib.auth.models import User

from .models import Booking
from .models import Amenity

def ForbiddenUsers(value):
	forbidden_users = ['admin', 'css', 'js', 'authenticate', 'login', 'logout', 'administrator', 'root',
	'email', 'user', 'join', 'sql', 'static', 'python', 'delete']
	if value.lower() in forbidden_users:
		raise ValidationError('Invalid name for user, this is a reserverd word.')

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

class SignupForm(forms.ModelForm):
	username = forms.CharField(widget=forms.TextInput(), max_length=30, required=True,)
	email = forms.CharField(widget=forms.EmailInput(), max_length=100, required=True,)
	password = forms.CharField(widget=forms.PasswordInput())
	confirm_password = forms.CharField(widget=forms.PasswordInput(), required=True, label="Confirm your password.")

	class Meta:

		model = User
		fields = ('username', 'email', 'password')

	def __init__(self, *args, **kwargs):
		super(SignupForm, self).__init__(*args, **kwargs)
		self.fields['username'].validators.append(ForbiddenUsers)
		self.fields['username'].validators.append(InvalidUser)
		self.fields['username'].validators.append(UniqueUser)
		self.fields['email'].validators.append(UniqueEmail)

	def clean(self):
		super(SignupForm, self).clean()
		password = self.cleaned_data.get('password')
		confirm_password = self.cleaned_data.get('confirm_password')

		if password != confirm_password:
			self._errors['password'] = self.error_class(['Passwords do not match. Try again'])
		return self.cleaned_data
