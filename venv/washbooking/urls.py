from django.urls import path
from . import views
from django.conf import settings
from rest_framework.authtoken.views import obtain_auth_token
from .views import *
from django.urls import re_path
from django.conf.urls.static import static 

urlpatterns = [
    path('auth/register/',
        RegisterView.as_view(),
        name='auth_user_create'),
    path('book/get/', GetBookingsAPIVIEW.as_view(), name='get_all_bookings'),
    path('book/user/', GetUserBookingAPIVIEW.as_view(), name='get_user_bookings'),
    path('book/add/', CreateBookingAPIVIEW.as_view(), name='add_booking'),
    path('book/delete/', DeleteBookingAPIVIEW.as_view(), name='delete_booking'),
    path('book/get/object/<int:object_pk>', GetBookingsFromObject.as_view(), name='get_booking_object'),
    path('book/get/object/<int:object_pk>/<str:date>', GetBookingsFromDay.as_view(), name='get_booking_object'),
    path('validate', checkValidationAPIVIEW.as_view(), name='check_validation'),
    path('object/get/<int:object_pk>', GetBookableObject.as_view(), name='get_bookable_object'),
    path('user/association/get', GetUserAssociationWithBookableObjects.as_view(), name="get_user_association"),
    path('join/association/add/<int:join_key>', UserJoinAssociation.as_view(), name="user_join_association"),
    path('join/association/get/<int:join_key>', GetJoinAssociation.as_view(), name="get_join_association"),
    path('user/bookedtimes/get', GetUserBookingAPIVIEW.as_view(), name='get_user_booked_times'),
    path('association/bookableobject/add', AddBookableObject.as_view(), name='add_bookableobject'),
    path('association/bookableobject/<int:pk>/delete', DeleteBookableObject.as_view(), name='delete_bookable_object'),
    path('association/bookableobject/<int:pk>/update', UpdateBookableObject.as_view(), name='update_bookable_object'),
    path('book/get/object/daterange/<int:bookid>/<str:startdate>/<str:enddate>', GetBookingsFromDateRange.as_view(), name='get_booking_from_date'),
    path('association/get/<int:pk>', GetImage.as_view(), name="get_image")

]