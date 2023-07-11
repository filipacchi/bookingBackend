from django.urls import path
from django.conf import settings
from .views import *
from django.conf.urls.static import static 
 
urlpatterns = [
    path('user/account/register/', RegisterView.as_view(), name='auth_user_create'),
    path('user/account/activate/', ActivateAccount.as_view(), name='auth_user_activate'),
    path('user/booking/create/', CreateBookingAPIVIEW.as_view(), name='add_booking'),
    path('user/booking/delete/', DeleteBookingAPIVIEW.as_view(), name='delete_booking'),
    path('user/booking/update/<int:pk>', UpdateBookedTime.as_view(), name='update_booking'),
    path('user/association/with/bookableobjects/get', GetUserAssociationWithBookableObjects.as_view(), name="get_user_association"), #
    path('user/association/join/add/<int:join_key>', UserJoinAssociation.as_view(), name="user_join_association"), #
    path('user/association/join/get/<int:join_key>', GetJoinAssociation.as_view(), name="get_join_association"), #
    path('user/bookedtimes/get', GetUserBookingsAPIVIEW.as_view(), name='get_user_booked_times'), #
    path('association/members/get/<int:pk>', GetAssociationUsersAPIView.as_view(), name="get_user_association"), #
    path('association/bookableobject/add', AddBookableObject.as_view(), name='add_bookableobject'), #
    path('association/bookableobject/delete/<int:pk>', DeleteBookableObject.as_view(), name='delete_bookable_object'), #
    path('association/bookableobject/update/<int:pk>', UpdateBookableObject.as_view(), name='update_bookable_object'), #
    path('association/bookableobject/get/<int:object_pk>', GetBookableObject.as_view(), name='get_bookable_object'), #
    path('association/image/get/<int:pk>', GetImage.as_view(), name="get_image"), #
    path('association/image/update/<int:pk>', UpdateAssociationImage.as_view(), name="update_image") ,# 
    path('association/bookableobject/bookedtimes/get/<int:object_pk>/<str:date>', GetBookingsFromDay.as_view(), name='get_booking_object'),
    path('association/allobjects/bookedtimes/daterange/get/<int:associationid>/<str:startdate>/<str:enddate>', GetBookingsFromAssociationAndDateRange.as_view(), name='get_booking_from_asso_DR'), #
    path('association/image/delete/<int:pk>', DeleteImage.as_view(), name="delete_image"),
    path('association/bookableobject/bookedtimes/get/<int:bookableid>/<str:startdate>', GetBookingsFromBookableObject.as_view(), name="get_bookings_object")


]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
""" path('book/user/', GetUserBookingsAPIVIEW.as_view(), name='get_user_bookings'), """
"""  path('book/get/object/<int:object_pk>', GetBookingsFromObject.as_view(), name='get_booking_object'), """
""" path('user/account/get', GetUserAccount.as_view(), name="get_user"), """

""" lade till URL på rad 30. Namnet stämmer överens med vår nya konvention /Kalle """


""" path('user/account/register/', RegisterView.as_view(), name='auth_user_create'), #
    path('user/booking/create/', CreateBookingAPIVIEW.as_view(), name='add_booking'), #
    path('user/booking/delete/', DeleteBookingAPIVIEW.as_view(), name='delete_booking'), #
    path('user/refreshtoken/validate', checkValidationAPIVIEW.as_view(), name='check_validation'), #
    path('user/association/with/bookableobjects/get', GetUserAssociationWithBookableObjects.as_view(), name="get_user_association"), #
    path('user/associations/get', GetUserAssociationsAPIVIEW.as_view(), name="get_user_associations_only"), #
    path('user/association/join/add/<int:join_key>', UserJoinAssociation.as_view(), name="user_join_association"), #
    path('user/association/join/get/<int:join_key>', GetJoinAssociation.as_view(), name="get_join_association"), #
    path('user/bookedtimes/get', GetUserBookingsAPIVIEW.as_view(), name='get_user_booked_times'), #
    path('association/bookableobject/add', AddBookableObject.as_view(), name='add_bookableobject'), #
    path('association/bookableobject/delete/<int:pk>', DeleteBookableObject.as_view(), name='delete_bookable_object'), #
    path('association/bookableobject/update/<int:pk>', UpdateBookableObject.as_view(), name='update_bookable_object'), #
    path('association/bookableobject/get/<int:object_pk>', GetBookableObject.as_view(), name='get_bookable_object'), #
    path('association/bookableobject/bookedtimes/daterange/get/<int:bookid>/<str:startdate>/<str:enddate>', 
         GetBookingsFromDateRange.as_view(), name='get_booking_from_date'), #
    path('association/image/get/<int:pk>', GetImage.as_view(), name="get_image"), #
    path('association/image/<int:pk>/update', UpdateAssociationImage.as_view(), name="update_image") # """
