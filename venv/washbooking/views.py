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
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import HttpResponse
import base64

class AddBookableObject(APIView):
    permission_classes = []
    def post(self, request):
        serializer = AddBookableObjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response('Added object!')
        else:
            return Response("An error occured, please try again later")
        
class UpdateBookableObject(APIView):
    permission_classes = []

    def put(self, request, pk):
        bookable_object = get_object_or_404(BookableObject, pk=pk)
        serializer = AddBookableObjectSerializer(bookable_object, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class DeleteBookableObject(APIView):
    permission_classes = []

    def delete(self, request, pk):
        try:
            bookable_object = BookableObject.objects.get(pk=pk)
            bookable_object.delete()
            return Response('Deleted object!')
        except BookableObject.DoesNotExist:
            return Response("Object does not exist", status=status.HTTP_404_NOT_FOUND)


class RegisterView(APIView):
    authentication_classes = []
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user = UserData.objects.get(id=serializer.data["id"])
        refresh = RefreshToken.for_user(user)
        data = {"info": serializer.data, "access_token": str(refresh.access_token), "refresh_token": str(refresh) }
        return Response(data)
    

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
        person = Person.objects.get(user=user.id) # jag
        my_associations_db = person.associations.all() # mina associations django-format
        print(my_associations_db)

        associations_serializer = AssociationSerializer(my_associations_db, many=True)
        my_associations = json.loads(json.dumps(associations_serializer.data))
        
        for association in my_associations:
            print("association in my_associations: " + association["name"])

        my_bookings = []

        for association in my_associations: 
            # alla bookable_objects som finns i mina associations
            bookable_objects_db = BookableObject.objects.filter(inAssociation=association["id"])
            bookable_objects_serializer = BookableObjectSerializer(bookable_objects_db, many=True)
            bookable_objects = json.loads(json.dumps(bookable_objects_serializer.data))

            for object in bookable_objects: #bookable_objects_db?
                print("--- Försöker printa object --- ")
                print(object)
                booked_times_db = BookedTime.objects.filter(booking_object=object["objectId"], booked_by=person)
                print("booked_times_db: ")
                print(booked_times_db)
                booked_times_serializer = BookedTimeSerializer(booked_times_db, many=True)
                print("booked_times_serializer: ")
                print(booked_times_serializer)
                booked_times = json.loads(json.dumps(booked_times_serializer.data))

                print("booked times: ")
                print(booked_times)

                for booked_time in booked_times:
                    print(booked_time)
                    my_bookings.append(
                    {
                        """ behöver troligen inte skicka key """
                    "bookingObjectKey": booked_time["booking_object"],
                    "bookingObject": object["objectName"],
                    "date": booked_time["date"],
                    "startTime": booked_time["start_time"][:-3],
                    "endTime": booked_time["end_time"][:-3],
                    "association": association["name"],
                    })

        return Response(my_bookings)
    
class GetBookingsAPIVIEW(APIView):
    permission_classes= [AllowAny]#[checkGroup]
    def get(self,request):
        print(self.request.data)
        bookings = BookedTime.objects.all()
        serializer = BookedTimeSerializer(bookings, many=True)
        return Response(serializer.data)

class GetBookingsFromDateRange(APIView):
    authentication_classes = []
    def get(self, request):
        bookid = request.data["bookable_id"]
        startdate = request.data["startdate"]
        enddate = request.data["enddate"]
        bookable_object = BookableObject.objects.get(objectId=bookid)
        bookings = BookedTime.objects.filter(booking_object=bookable_object, date__range=[startdate, enddate])
        serializer = BookedTimeSerializer(bookings, many=True)

        print(bookable_object)
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
    
class CreateBookingAPIVIEW(APIView):
    permission_classes= []
    def post(self,request,object_pk) : 
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
        serializer = AssociationSerializer(user_associations, many=True)
        return Response(serializer.data)
    
class GetUserAssociationWithBookableObjects(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = self.request.user
        person = Person.objects.get(user=user.id)
        user_associations = person.associations.all()
        serializer = AssociationSerializer(user_associations, many=True)
        asso = json.loads(json.dumps(serializer.data))
        for index in range(len(asso)):
            print(asso[index]['name'])
            bookable_objects = BookableObject.objects.filter(inAssociation=asso[index]['id'])
            ####print(BookableObjectSerializer(bookable_objects, many=True))
            asso[index]['bookobjects'] = json.loads(json.dumps(BookableObjectSerializer(bookable_objects, many=True).data))
            
            #print(bookable_objects)
        #bookable_objects_serializer = BookableObjectSerializer(bookable_objects, many=True)
        #asso = json.loads(json.dumps(serializer.data))
        #asso['bookobjects'] = json.loads(json.dumps(bookable_objects_serializer.data))
        print(asso)
        return Response(asso)

class GetJoinAssociation(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, join_key):
        join_association = Association.objects.get(join_key=join_key)
        serializer = AssociationSerializer(join_association)
        return Response(serializer.data)

class UserJoinAssociation(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, join_key):
        user = self.request.user
        person = Person.objects.get(user=user.id)
        join_association = Association.objects.get(join_key=join_key)
        person.associations.add(join_association)
        person.save()
        return Response(join_key)

class GetImage(APIView):
    permission_classes = []
    def get(self, request, pk):
        image = Association.objects.get(join_key=pk).profile_image
        
        return HttpResponse(image, content_type="image/png")

















    
class GetUserAssociation(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = self.request.user
        person = Person.objects.get(user=user.id)
        user_associations = person.associations.all()
        serializer = AssociationSerializer(user_associations, many=True)
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