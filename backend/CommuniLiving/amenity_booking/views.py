# from django.http import HttpResponse
# from django.shortcuts import render
# from django.http import HttpResponseRedirect
# from .models import Booking
# from .forms import BookingForm

# def add_booking(request):
#     submitted = False
#     if request.method == 'POST':
#         form = BookingForm(request.POST)
#         if form.is_valid():
#             form.save()
#             return HttpResponseRedirect('/add_booking?submitted=True')
#     else:
#         form = BookingForm()
#         if 'submitted' in request.GET:
#             submitted = True
#     return render(request, 'add_booking.html', {'form':form, 'submitted':submitted})

# ------------------------------------------------------------------------------------
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import YourModel
from .serializers import YourModelSerializer

class YourModelAPIView(APIView):
    def get(self, request):
        data = YourModel.objects.all()
        serializer = YourModelSerializer(data, many=True)
        return Response(serializer.data)
