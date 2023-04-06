import json
from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.conf import settings
from django.db.models.signals import post_save;
from django.dispatch import receiver



class UserManager(BaseUserManager):

    use_in_migration = True

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email is Required')
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff = True')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser = True')

        return self.create_user(email, password, **extra_fields)

class Association(models.Model):
    name = models.CharField(max_length=200, blank=False, default="")
    adress = models.CharField(max_length=200, blank=False)
    # city = models.CharField(max_length=200, blank=False)
    # postalcode =  models.CharField(max_length=200, blank=False)
    coordinateX = models.FloatField(max_length=200, blank=False)
    coordinateY = models.FloatField(max_length=200, blank=False)

    def __str__(self):
        return self.name

class UserData(AbstractUser):

    username = None
    name = models.CharField(max_length=100, unique=True)
    email = models.EmailField(max_length=100, unique=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    
    objects = UserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.name

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


class BookableObject(models.Model):
    objectId = models.AutoField(primary_key=True)
    inAssociation = models.ForeignKey(Association, on_delete=models.CASCADE)
    objectName = models.CharField(max_length=200,blank=False)
    timeSlotLength = models.FloatField(max_length=2)
    timesSlotStartTime = models.TimeField()


class BookedTime(models.Model):
    startTime = models.DateTimeField(unique=True, blank=False)
    endTime = models.DateTimeField(unique=True, blank=False)

class Key(models.Model):
    key = models.CharField(max_length=10)
    used = models.BooleanField(blank=False)


class Person(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        primary_key=True,
    )
    # måste undersöka om manytomany ska användas eller foreign key
    # associations = models.ManyToManyField(Association) 
    assocation = models.ForeignKey(Association,blank=True, null=True,on_delete=models.CASCADE)

    def __str__(self):
        return self.user.name


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def update_profile_signal(sender, instance, created, **kwargs):
    if created:
        Person.objects.create(user=instance)
    instance.person.save()
