from django.urls import path
from . import views
from django.conf import settings

urlpatterns = [
    path('get/', views.getBooking),
    path('post/', views.postBooking),
    path('delete/<int:pk>/', views.deleteBooking)
]