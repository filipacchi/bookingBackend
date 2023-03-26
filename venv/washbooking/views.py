from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Booking
from .serializer import BookingSerializer
from django.http import Http404
from rest_framework import status

@api_view(['GET'])
def getBooking(request):
    booking = Booking.objects.all()
    serializer = BookingSerializer(booking, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def postBooking(request):
    serializer = BookingSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)
@api_view(['DELETE'])
def deleteBooking(request, pk):
    try:
        booking = Booking.objects.get(pk=pk)
        booking.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Booking.DoesNotExist:
            raise Http404

# Create your views here.
