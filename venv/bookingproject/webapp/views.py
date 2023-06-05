from django.shortcuts import render
from django.contrib.auth.views import PasswordResetView, PasswordResetDoneView, PasswordResetConfirmView, PasswordResetCompleteView
from django.views.generic import TemplateView

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

