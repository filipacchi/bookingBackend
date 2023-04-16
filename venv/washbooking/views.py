from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import *
from .serializer import BookingSerializer
from django.http import Http404
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import *
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from .serializer import *
from django.contrib.auth.mixins import PermissionRequiredMixin
from .permissions import *
from datetime import datetime

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

class RegisterView(APIView):
    authentication_classes = []
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


#####
#Inte min egna kod, ett exempel som vi kan jobba utifrån
# class CreateUserAPIView(CreateAPIView):
#     serializer_class = CreateUserSerializer
#     permission_classes = [AllowAny]

#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         self.perform_create(serializer)
#         headers = self.get_success_headers(serializer.data)
#         # We create a token than will be used for future auth
#         token = Token.objects.create(user=serializer.instance)
#         token_data = {"token": token.key}
#         return Response(
#             {**serializer.data, **token_data},
#             status=status.HTTP_201_CREATED,
#             headers=headers
#         )


class LogoutUserAPIView(APIView):
    queryset = get_user_model().objects.all()

    def get(self, request, format=None):
        # simply delete the token to force a login
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)
    #####

class GetUserBookingAPIVIEW(APIView):
    permission_classes = [IsAuthenticated]#[checkGroup]
    def get(self, request):
        user = self.request.user
        person = Person.objects.get(user=user.id)
        user_associations = person.associations.all()
        print(user_associations)
        for association in user_associations:
            bookable_object = BookableObject.objects.filter(inAssociation=association)
            for object in bookable_object:
                print(BookedTime.objects.filter(booking_object=object))
        return Response("GetUserBooking")
    
class GetBookingsAPIVIEW(APIView):
    permission_classes= [AllowAny]#[checkGroup]
    def get(self,request):
        print(self.request.data)
        bookings = BookedTime.objects.all()
        serializer = BookedTimeSerializer(bookings, many=True)
        return Response(serializer.data)
    
class GetBookingsFromObject(APIView):
    permission_classes=[]
    def get(self,request,object_pk):
        bookable_object = BookableObject.objects.get(objectId=object_pk)
        bookings = BookedTime.objects.filter(booking_object=bookable_object)
        bookedSerializer = BookedTimeSerializer(bookings, many=True)
        bookableSeralizer = BookableObjectSerializer(bookable_object)
        
        print(bookings)
        print(json.dumps(bookedSerializer.data))
        return Response([bookableSeralizer.data,bookedSerializer.data] )


class GetBookingsFromDay(APIView):
    permission_classes=[]
    def get(self,request,object_pk,date):
        bookable_object = BookableObject.objects.get(objectId=object_pk)
        bookings = BookedTime.objects.filter(booking_object=bookable_object,date=date)
        bookedSerializer = BookedTimeSerializer(bookings, many=True)
        bookableSeralizer = BookableObjectSerializer(bookable_object)
        
        print(bookings)
        print(json.dumps(bookedSerializer.data))
        return Response([bookableSeralizer.data,bookedSerializer.data] )

class GetBookableObject(APIView):
    permission_classes = []
    def get(self, request, object_pk):
        bookable_object = BookableObject.objects.get(objectId=object_pk)
        serializer = BookableObjectSerializer(bookable_object)
        return Response(serializer.data)
    
class CreateBookingAPIVIEW( APIView):
    permission_classes= []
    def post(self,request,object_pk) : """  """
        request.data["booked_by"] = self.request.user.id
        request.data["booking_object"] = object_pk
        serializer = BookedTimeSerializer(data=request.data)
        if serializer.is_valid():
            return checkBooking(serializer, object_pk)
            #serializer.save()
        return Response("An error occured, this time might not be available")

class checkValidationAPIVIEW(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        return Response(True)
    
class GetUserAssociation(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = self.request.user
        person = Person.objects.get(user=user.id)
        user_associations = person.associations.all()
        serializer = AssociationSerializer(user_associations)
        return Response(serializer.data)

















    
def checkBooking(serializer, object_pk):
    bookRequest = serializer.data
    start_time = datetime.strptime(bookRequest['start_time'], "%H:%M:%S").time()
    end_time = datetime.strptime(bookRequest['end_time'], "%H:%M:%S").time()
    book_time_diff = calculateTimeDifference(bookRequest['start_time'], bookRequest['end_time'])
    bookable_object = BookableObject.objects.get(objectId=object_pk)
    object_begin_time = bookable_object.timeSlotStartTime
    object_slot_length = bookable_object.timeSlotLength
    bookings = BookedTime.objects.filter(booking_object=bookable_object, date=bookRequest['date'])
    if (book_time_diff == object_slot_length) and (object_begin_time <= start_time):
        if bookings.exists():
            for booking in bookings:
                if (booking.start_time < start_time < booking.end_time) or (booking.start_time < end_time < booking.end_time) or (start_time <= booking.start_time and end_time >= booking.end_time):
                    return Response("Time overlap, try another time")
                elif(abs(calculateTimeDifference(start_time.strftime("%H:%M:%S"), booking.start_time.strftime("%H:%M:%S"))) % object_slot_length != 0):
                    return Response("Bokning får inte lämna obokbara platser")
        return Response("Bokning okej")        
                    

    return Response("Error, perhaps incorrect slotlength or timestart")

def calculateTimeDifference(t1, t2):
    
    print("CALCULATE: "+t1)
    return int(t2[0:2]) - int(t1[0:2])