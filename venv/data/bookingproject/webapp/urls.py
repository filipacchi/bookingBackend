from django.urls import path
from . import views
from django.urls import path, include
from .views import *

urlpatterns = [
    path('accounts/password-reset/', CustomPasswordResetView.as_view(), name='password_reset'),
    path('accounts/password-reset/done/', CustomPasswordResetDoneView.as_view(), name='password_reset_done'),
    path('accounts/reset/<uidb64>/<token>/', CustomPasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('accounts/reset/done/', CustomPasswordResetCompleteView.as_view(), name='password_reset_complete'),
    path('', views.home, name='home'),
]