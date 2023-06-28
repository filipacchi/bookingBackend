from rest_framework.response import Response
from .models import *
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework.permissions import *
from rest_framework.views import APIView
from .serializer import *
from .permissions import *
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import HttpResponse
import pprint
from datetime import datetime, timedelta
from .forms import UpdateAssociationImageForm
import os
from django.conf import settings
import pandas
from django.core.mail import EmailMessage

class DeleteImage(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        association = get_object_or_404(Association, pk=pk)
        if association.profile_image:
            image_path = association.profile_image.path
            if os.path.exists(image_path):
                os.remove(image_path)
                association.profile_image.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_404_NOT_FOUND)
    

    
class UpdateAssociationImage(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        association = get_object_or_404(Association, pk=pk)
        form = UpdateAssociationImageForm(request.data, instance=association)
        if form.is_valid():
            association.profile_image = request.FILES['profile_image']
            association.save()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)


class AddBookableObject(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        serializer = AddBookableObjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response('Added object!')
        else:
            return Response("An error occured, please try again later") 
        
class UpdateBookableObject(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        bookable_object = get_object_or_404(BookableObject, pk=pk)
        serializer = AddBookableObjectSerializer(bookable_object, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class DeleteBookableObject(APIView):
    permission_classes = [IsAuthenticated]

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
        print('I serializern: ')
        print(request.data)
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user = UserData.objects.get(id=serializer.data["id"])
        email_subject = 'Verify Email'
        email_body = 'Verification code: '+str(user.confirmation_code)
        sender_email = 'noreply@bookease.se'
        recipient_email = str(user.email)
        email = EmailMessage(email_subject, email_body, sender_email, [recipient_email])
        email.send()
        """ refresh = RefreshToken.for_user(user)
        data = {"info": serializer.data, "access_token": str(refresh.access_token), "refresh_token": str(refresh) }
        return Response(data) """
        return Response(status=200)
    
class ActivateAccount(APIView):
    def post(self, request):
        email = request.data["email"]
        confirmation_code = request.data["confirmation_code"]

        try: 
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'result': False})
        if str(user.confirmation_code) == str(confirmation_code):
            try:
                user.is_active = True
                user.save()
                return Response({'result': True})
            except:
                return Response({"error": "error saving"})
            
        else: 
            return Response({'result': False})
    

class LogoutUserAPIView(APIView):
    queryset = get_user_model().objects.all()

    def get(self, request, format=None):
        # simply delete the token to force a login
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)


class GetUserAssociationsAPIVIEW(APIView):
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

        return Response(my_associations)

class GetUserBookingsAPIVIEW(APIView):
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
                booked_times_db = BookedTime.objects.filter(booking_object=object["objectId"], booked_by=person)
                booked_times_serializer = BookedTimeSerializer(booked_times_db, many=True)
                booked_times = json.loads(json.dumps(booked_times_serializer.data))

                for booked_time in booked_times:
                    print('HÄR')
                    print(booked_time)
                    my_bookings.append(
                    {
                    "bookingObjectKey": booked_time["booking_object"],
                    "bookingObject": object["objectName"],
                    "date": booked_time["date"],
                    "startTime": booked_time["start_time"][:-3],
                    "endTime": booked_time["end_time"][:-3],
                    "association": association["name"],
                    "associationId": association["id"],
                    "profile_image": association["profile_image"],
                    "opened": False,
                    "timePast": booked_time["time_past"],
                    "bookingId": booked_time["bookingId"]
                    })

        return Response(my_bookings)
    

class AdminGetBookedTimes(APIView):
    authentication_classes = [Association]

    
class GetUserAccount(APIView):
    authentication_classes = [IsAuthenticated]
    def get(self, request):
        return Response(self.request.user.first_name)

class GetBookingsAPIVIEW(APIView):
    permission_classes= [IsAuthenticated]#[checkGroup]
    def get(self,request):
        print(self.request.data)
        bookings = BookedTime.objects.all()
        serializer = BookedTimeSerializer(bookings, many=True)
        return Response(serializer.data)
    def put(self, request):
        return Response("PUT")

class GetBookingsFromDateRange(APIView):
    authentication_classes = [IsAuthenticated]
    def get(self, request, bookid, startdate, enddate):

        bookable_object = BookableObject.objects.get(objectId=bookid)
        bookings = BookedTime.objects.filter(booking_object=bookable_object, date__range=[startdate, enddate])
        serializer = BookedTimeSerializer(bookings, many=True)
        format = "%Y-%m-%d"
        print(startdate)
        sdate = datetime.strptime(startdate, format)
        edate = datetime.strptime(enddate, format)
        print(bookable_object)
        time_slot_array = populateTimeSlots(serializer.data, BookableObjectSerializer(bookable_object).data, sdate, edate)

        return Response(time_slot_array)
    
class GetBookingsFromAssociationAndDateRange(APIView):
    """ authentication_classes = [IsAuthenticated] förut """
    permission_classes = [IsAuthenticated]
    
    def get(self, request, associationid, startdate, enddate):
        sorted_bookings = []

        bookable_objects_db = BookableObject.objects.filter(inAssociation=associationid)
        bookable_objects_serializer = BookableObjectSerializer(bookable_objects_db, many=True)
        bookable_objects = json.loads(json.dumps(bookable_objects_serializer.data))
        """ kanske ta bort json load dump """

        for object in bookable_objects:
            bookings_db = BookedTime.objects.filter(booking_object=object["objectId"], date__range=[startdate, enddate])
            bookings_serializer = BookedTimeSerializer(bookings_db, many=True)
            bookings = json.loads(json.dumps(bookings_serializer.data))
            format = "%Y-%m-%d"
            print(startdate)
            sdate = datetime.strptime(startdate, format)
            edate = datetime.strptime(enddate, format)
            print(object)
            time_slot_array = populateTimeSlots(bookings, object, sdate, edate)

            sorted_bookings.append({"bookingObject": object["objectName"], "bookedTimes": time_slot_array})
        
        print("skickar från GetBookingsFromAssociationAndDateRange")
        print(sorted_bookings)
        return Response(sorted_bookings)
    
class GetBookingsFromBookableObject(APIView):
    authentication_classes = [IsAuthenticated]
    def get(self, request, bookableid, startdate):
        bookable_object = BookableObject.objects.get(objectId=bookableid)
        book_ahead_weeks = int(bookable_object.bookAheadWeeks)
        format = "%Y-%m-%d"
        sdate = datetime.strptime(startdate, format)
        weeks = timedelta(weeks = book_ahead_weeks)
        edate = sdate + weeks
        enddate = datetime.strftime(edate, format)

        bookings = BookedTime.objects.filter(booking_object=bookable_object, date__range=[startdate, enddate])
        serializer = BookedTimeSerializer(bookings, many=True)
        print(startdate)
        print(bookable_object)
        time_slot_array = populateTimeSlots(serializer.data, BookableObjectSerializer(bookable_object).data, sdate, edate)

        return Response(time_slot_array)

    
class GetBookingsFromObject(APIView):
    permission_classes=[IsAuthenticated]
    def get(self,request,object_pk):
        bookable_object = BookableObject.objects.get(objectId=object_pk)
        bookings = BookedTime.objects.filter(booking_object=bookable_object)
        bookedSerializer = BookedTimeSerializer(bookings, many=True)
        bookableSeralizer = BookableObjectSerializer(bookable_object)
        print(bookings)
        print(json.dumps(bookedSerializer.data))
        return Response([bookableSeralizer.data,bookedSerializer.data] )
    
def checkUserBookings(user, object, date_str):
    date_object = datetime.strptime(date_str, '%Y-%m-%d').date()
    start_date = date_object - timedelta(days=date_object.weekday())
    end_date = start_date + timedelta(days=6)
    user_bookings_week = BookedTime.objects.filter(booked_by=user.id, booking_object=object, date__range=[start_date, end_date] ).count()
    user_bookings_day = BookedTime.objects.filter(booked_by=user.id, booking_object=object, date=date_object).count()
    print(user_bookings_day)
    bookings_day = object.slotsPerDay - user_bookings_day
    bookings_week = object.slotsPerWeek - user_bookings_week
    booking_info = {"day": bookings_day, "week": bookings_week}

    return booking_info



class GetBookingsFromDay(APIView):
    permission_classes=[IsAuthenticated]
    def get(self,request,object_pk,date):
        bookable_object = BookableObject.objects.get(objectId=object_pk)
        bookings = BookedTime.objects.filter(booking_object=bookable_object,date=date)
        bookedSerializer = BookedTimeSerializer(bookings, many=True)
        bookableSeralizer = BookableObjectSerializer(bookable_object)
        format = "%Y-%m-%d"
        sdate = datetime.strptime(date, format)
        
        print(bookings)
        print(json.dumps(bookedSerializer.data))
        time_slot_array = populateTimeSlots(bookedSerializer.data, bookableSeralizer.data, sdate, sdate)
        #time.sleep(2)
        booking_info = checkUserBookings(self.request.user, bookable_object, date)
        data = {"time_slot_array": time_slot_array, "booking_info": booking_info}
        return Response(data)

class GetBookableObject(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, object_pk):
        bookable_object = BookableObject.objects.get(objectId=object_pk)
        serializer = BookableObjectSerializer(bookable_object)
        return Response(serializer.data)
    
class CreateBookingAPIVIEW(APIView):
    permission_classes= [IsAuthenticated]
    def post(self,request): 
        user = self.request.user
        object = BookableObject.objects.get(objectId=request.data["booking_object"])

        request.data["booked_by"] = user.id
        date_str = request.data["date"]
        date_object = datetime.strptime(date_str, '%Y-%m-%d').date()
        start_date = date_object - timedelta(days=date_object.weekday())
        end_date = start_date + timedelta(days=6)
        distinct_bookings = BookedTime.objects.filter(booked_by=user.id, booking_object=object, date__range=[start_date, end_date] ).values('date').distinct()
        user_bookings_week = distinct_bookings.count()
        user_bookings_day = BookedTime.objects.filter(booked_by=user.id, booking_object=object, date=date_object).count()
        print("VECKORKOLLA: "+str(distinct_bookings))
        #pprint.pprint(date_object.weekday())
        #print(user_bookings_amount)
        slots_per_day = object.slotsPerDay
        slots_per_week = object.slotsPerWeek
        #print(slots_per_day)
        #print(slots_per_week)
        if(user_bookings_week == slots_per_week):
            if distinct_bookings.filter(date=date_object).exists():
                if user_bookings_day < slots_per_day:
                    print("OK DAG")
                    serializer = BookedTimeSerializer(data=request.data)
                    if serializer.is_valid():
                #return checkBooking(serializer, object_pk)
                        serializer.save()
                #time.sleep(2)
                        return Response("Bokar")
                    return Response("An error occured, this time might not be available")
                else:
                    return Response("ToManyBookingsPerDay")
            else:
                return Response("ToManyBookingsPerWeek")
        elif user_bookings_week < slots_per_week:
            if user_bookings_day < slots_per_day:
                print("OK DAG")
                serializer = BookedTimeSerializer(data=request.data)
                if serializer.is_valid():
                #return checkBooking(serializer, object_pk)
                    serializer.save()
                #time.sleep(2)
                    return Response("Bokar")
                return Response("An error occured, this time might not be available")
            else:
                return Response("ToManyBookingsPerDay")
        else:
            return Response("ToManyBookingsPerWeek")
        
class UpdateBookedTime(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        booked_time = get_object_or_404(BookedTime, pk=pk)
        serializer = BookedTimeSerializer(booked_time, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()  # Update the object with the new data
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            print(request.data)
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteBookingAPIVIEW(APIView):
    permission_classes= [IsAuthenticated]
    def delete(self,request) : 
        pprint.pprint(request.data)
        booking = BookedTime.objects.filter(start_time=request.data["start_time"], end_time=request.data["end_time"], date=request.data["date"], booking_object=request.data["booking_object"])
        booking.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

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
            asso[index]['bookobjects'] = json.loads(json.dumps(BookableObjectSerializer(bookable_objects, many=True).data))
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
    permission_classes = [IsAuthenticated]
    def get(self, request, pk):
        image = Association.objects.get(pk=pk).profile_image
        if image == "": 
            print("FEL")
            return HttpResponse(status=404)
        else:
            return HttpResponse(image, content_type="image/png")
        """ try:
            
            return HttpResponse(image, content_type="image/png")
        except:
            return Response()
        else:
            return HttpResponse(image, content_type="image/png") """

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

def populateTimeSlots(booked_times, bookable_object, sdate, edate):
    time_slot_dict = {}
    format = "%Y-%m-%d"
    date_array = pandas.date_range(sdate,edate,freq='d')
    for date in date_array:
    
        currentdate = datetime.strftime(date, format)
        time_slot_dict[currentdate] = createTimeSlots(bookable_object)
    
    for booking in booked_times:
        for slot in time_slot_dict[booking["date"]]:
            if int(booking["start_time"][0:2]) == slot["id"]:
                slot["booked"] = True
                slot["booked_by"] = booking["booked_by"]
    return time_slot_dict


def createTimeSlots(bookable_object):
    """ print("type and value of bookableobject")
    print(type(bookable_object))
    print(bookable_object) """

    start_time = int(bookable_object["timeSlotStartTime"][0:2])
    end_time = int(bookable_object["timeSlotEndTime"][0:2])
    slot_length = int(bookable_object["timeSlotLength"])
    loop_range = int((24-slot_length)/slot_length)
    time_slot_array = []

    if(start_time == end_time):
        index = start_time % slot_length
        end_range = index+24

    elif end_time < start_time:
        index = start_time
        end_range = end_time + 24

    else: 
        index = start_time
        end_range = end_time

    while index < end_range:
        next_index = (index+slot_length) % 24
        
        if (index+slot_length) <= end_range:
            title_temp = prettyDate(index % 24, next_index)
            time_slot_array.append({ "id": index % 24, "title": title_temp, "booked": False, "booked_by": "" })
        """  timeSlotArray.append({"id": index, "title": titleTemp, "booked": False}) """
        index = index + slot_length
    return time_slot_array

    
def prettyDate(i1, i2):
    if(i1 == 24):
        i1 = 0
    if(i2 == 24):
        i2 = 0
    if len(str(i1)) == 1:
        t1 = "0" + str(i1) + ":00"
    else:
        t1 = str(i1) + ":00"
    if len(str(i2)) == 1:
        t2 = "0" + str(i2) + ":00"
    else:
        t2 = str(i2) + ":00"
    return t1 + " - " + t2