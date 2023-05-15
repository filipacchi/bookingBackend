from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model;
from rest_framework_simplejwt.tokens import RefreshToken


""" serializers översätter från SQL till json och vice versa. nycklarna till json-objekten är attributes i entityn """

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserData
        fields = ["id", "email", "first_name","last_name", "password", "is_association"]

    def create(self, validated_data):
        user = UserData.objects.create(email=validated_data['email'],
                                       first_name=validated_data['first_name'],
                                       last_name=validated_data['last_name']
                                         )
        user.set_password(validated_data['password'])
        user.save()
        return user
    
class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model=Booking
        fields=('id','name','date')

class AssociationSerializer(serializers.ModelSerializer):
    class Meta:
        model=Association
        fields=('name', 'adress', 'coordinateX', 'coordinateY', 'id', 'region', 'profile_image', 'join_key')

class BookedTimeSerializer(serializers.ModelSerializer): 
    class Meta:
        model=BookedTime
        fields=('start_time','end_time','booking_object','booked_by','date')

class BookableObjectSerializer(serializers.ModelSerializer):
    class Meta:
        model=BookableObject
        fields=("objectId", "inAssociation", "objectName", "timeSlotLength","timeSlotStartTime","timeSlotEndTime", "slotsPerDay", "slotsPerWeek")

class AddBookableObjectSerializer(serializers.ModelSerializer):
    class Meta:
        model=BookableObject
        fields=("inAssociation", "objectName", "timeSlotLength","timeSlotStartTime","timeSlotEndTime", "slotsPerDay", "slotsPerWeek")

class UpdateAssociationImageSerializer(serializers.ModelSerializer):
    class Meta:
        model=Association
        fields=("profile_image")