from django.contrib import admin
from .models import *


admin.site.register(Booking)
admin.site.register(Association)
admin.site.register(BookableObject)
admin.site.register(BookedTime)
admin.site.register(Key)
admin.site.register(Profile)

# Register your models here.
