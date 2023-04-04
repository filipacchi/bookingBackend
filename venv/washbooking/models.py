from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.

class Booking(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    date = models.DateField()

# class User(models.Model):
#     userName = models.CharField(max_length=200, primary_key=True, unique=True, blank=False)
#     language = models.CharField(max_length=200)
#     email = models.CharField(max_length=200, unique=True,blank=False)
#     password = models.CharField(max_length=200, blank=False)

User = get_user_model()

class Association(models.Model):
    member = models.ForeignKey(User, on_delete=models.CASCADE)  #reffererar till djangos egna
    adress = models.CharField(max_length=200, blank=False)
    coordinateX = models.FloatField(max_length=200, blank=False)
    coordinateY = models.FloatField(max_length=200, blank=False)

class BookableObjects(models.Model):
    objectId = models.AutoField(primary_key=True)
    inAssociation = models.ForeignKey(Association, on_delete=models.CASCADE)
    objectName = models.CharField(blank=False)
    timeSlotLength = models.FloatField(max_length=2)
    timesSlotStartTime = models.TimeField()


class BookedTimes(models.Model):
    startTime = models.DateTimeField(unique=True, blank=False)
    endTime = models.DateTimeField(unique=True, blank=False)

class Keys(models.Model):
    key = models.CharField(max_length=10)
    used = models.BooleanField(blank=False)