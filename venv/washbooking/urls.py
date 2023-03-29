from django.urls import path
from . import views
from django.conf import settings
from rest_framework.authtoken.views import obtain_auth_token
from .views import CreateUserAPIView, LogoutUserAPIView
from django.urls import re_path

urlpatterns = [
    path('get/', views.getBooking),
    path('post/', views.postBooking),
    path('delete/<int:pk>/', views.deleteBooking),
    path('auth/login/',
        obtain_auth_token,
        name='auth_user_login'),
    path('auth/register/',
        CreateUserAPIView.as_view(),
        name='auth_user_create'),
    path('auth/logout/',
        LogoutUserAPIView.as_view(),
        name='auth_user_logout')
]