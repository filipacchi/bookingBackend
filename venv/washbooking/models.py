import json
from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.conf import settings
from django.db.models.signals import post_save;
from django.dispatch import receiver
from django.core.validators import RegexValidator
import uuid 
import random
from django.db.models.signals import pre_save
from django.dispatch import receiver


# lets us explicitly set upload path and filename
def upload_to(instance, filename):
    return 'images/{filename}'.format(filename=filename)

def randomHex():
    randomHex = uuid.uuid4().hex[:1]
    return randomHex

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
    region = models.CharField(max_length=200, default="")
    join_key = models.CharField(max_length=6, unique=True, validators=[RegexValidator(r'^\d{1,10}$')])
    coordinateX = models.FloatField(max_length=200, blank=False)
    coordinateY = models.FloatField(max_length=200, blank=False)
    profile_image = models.ImageField(upload_to=upload_to, blank=True, null=True) 

    def __str__(self):
        return self.name

class UserData(AbstractUser):

    username = None
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    native_lang = models.CharField(max_length=100, blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_association = models.BooleanField(default=False)
    confirmation_code = models.IntegerField(unique=True)
    
    objects = UserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name']

    def __str__(self):
        return self.first_name + " " + self.last_name


def generate_random_code(sender, instance, *args, **kwargs):
    if not instance.confirmation_code:
        unique_code = random.randint(1000, 9999)
        instance.confirmation_code = unique_code

# Register the function as a signal receiver
pre_save.connect(generate_random_code, sender=UserData)

class Booking(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    date = models.DateField()

User = get_user_model()


class BookableObject(models.Model):
    objectId = models.AutoField(primary_key=True)
    inAssociation = models.ForeignKey(Association, null= True, on_delete=models.CASCADE)
    objectName = models.CharField(max_length=200,blank=False)
    timeSlotLength = models.IntegerField(blank=False)
    timeSlotStartTime = models.TimeField(blank=False)
    timeSlotEndTime = models.TimeField(blank=False)
    bookableAfterLast = models.BooleanField(blank=False, default=False)
    slotsPerDay = models.IntegerField(blank=True, default=100)
    slotsPerWeek = models.IntegerField(blank=True, default=100)
    bookAheadWeeks = models.IntegerField(blank=False, default=4)

    def __str__(self):
        return self.objectName

class Person(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        primary_key=True,
    )
    # måste undersöka om manytomany ska användas eller foreign key
    associations = models.ManyToManyField(Association) 

    def __str__(self):
        return self.user.first_name + " " +self.user.last_name


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def update_profile_signal(sender, instance, created, **kwargs):
    if created:
        Person.objects.create(user=instance)
    instance.person.save()

class BookedTime(models.Model):

    booking_object = models.ForeignKey(BookableObject, on_delete=models.CASCADE, blank=False)
    booked_by = models.ForeignKey(Person, on_delete=models.CASCADE, blank=False)
    date = models.DateField(help_text="YYYY-MM-DD", blank=False)
    start_time = models.TimeField(help_text="HH:MM:SS", blank=False)
    end_time = models.TimeField(help_text="HH:MM:SS", blank=False)
    time_past = models.BooleanField(blank=False, default=False)

    class Meta:
        unique_together = ('date', 'start_time', 'end_time', 'booking_object')

    def __str__(self):
        return str(self.booking_object.objectName + " "+ str(self.start_time)+ " - " +str(self.end_time))


class Key(models.Model):
    key = models.CharField(max_length = 10, default=randomHex, editable=False, primary_key=False)
    used = models.BooleanField(blank=False)
    associationKey = models.ForeignKey(Association, null=True, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('key', 'associationKey')

    def __str__(self):
        return str(self.key)
   
