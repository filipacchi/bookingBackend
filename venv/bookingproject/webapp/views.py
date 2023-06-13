from django.shortcuts import render
from django.contrib.auth.views import PasswordResetView, PasswordResetDoneView, PasswordResetConfirmView, PasswordResetCompleteView
from django.views.generic import TemplateView
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from rest_framework import status
from rest_framework.permissions import *
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import HttpResponse
import pprint
from datetime import datetime, timedelta
import os
from django.conf import settings
from washbooking.models import *


def home(request):
    return render(request, 'webapp/home.html')
# Create your views here.

class CustomPasswordResetView(PasswordResetView):
    template_name = "webapp/registration/password_reset_form.html"

class CustomPasswordResetDoneView(PasswordResetDoneView):
    template_name = "webapp/registration/password_reset_done.html"

class CustomPasswordResetConfirmView(PasswordResetConfirmView):
    template_name = "webapp/registration/password_reset_confirm.html"

class CustomPasswordResetCompleteView(PasswordResetCompleteView):
    template_name = "webapp/registration/password_reset_complete.html"

class TermsOfService(TemplateView):
    template_name = "webapp/termsofservice.html"
    
class PrivacyPolicy(TemplateView):
    template_name = "webapp/privacypolicy.html"

class DeleteUser(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        person = Person.objects.get(user=self.request.user)
        BookedTime.objects.filter(booked_by=person).delete()
        self.request.user.delete()
        return Response(status=status.HTTP_200_OK)

