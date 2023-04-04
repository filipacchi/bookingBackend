from django.db import models

# Create your models here.

class Booking(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    date = models.DateField()

class User(models.Model):
    userName = models.CharField(max_length=200, primary_key=True, unique=True, blank=False)
    language = models.CharField(max_length=200)
    email = models.CharField(max_length=200, unique=True,blank=False)
    password = models.CharField(max_length=200, blank=False)

class Association(models.Model):
    adress = models.CharField(max_length=200, blank=False)
    coordinateX = models.FloatField(max_length=200, blank=False)
    coordinateY = models.FloatField(max_length=200, blank=False)

class BookableObjects(models.Model):
    ...

class BookedTimes(models.Model):
    startTime = models.DateTimeField(unique=True, blank=False)
    endTime = models.DateTimeField(unique=True, blank=False)

class Keys(models.Model):
    key = models.CharField(max_length=10)
    used = models.BooleanField(blank=False)