from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt import views as jwt_views
from .settings import SECRET_KEY
from rest_framework_simplejwt.settings import api_settings
from washbooking.models import UserData
import jwt
import json

class MyTokenRefreshPairSerializer(TokenRefreshSerializer):

    def validate(self, attrs):
        refresh = self.token_class(attrs["refresh"])

        data = {"access": str(refresh.access_token)}
        
        decoded_token = jwt.decode(str(refresh.access_token), SECRET_KEY, algorithms=['HS256'])
        user_id = decoded_token.get('user_id')
        user = UserData.objects.get(id=user_id)
        data['isAssociation'] = user.is_association
        data['firstName'] = user.first_name
        data['lastName'] = user.last_name
        data['isActive'] = user.is_active
        
        if api_settings.ROTATE_REFRESH_TOKENS:
            if api_settings.BLACKLIST_AFTER_ROTATION:
                try:
                    # Attempt to blacklist the given refresh token
                    refresh.blacklist()
                except AttributeError:
                    # If blacklist app not installed, `blacklist` method will
                    # not be present
                    pass

            refresh.set_jti()
            refresh.set_exp()
            refresh.set_iat()

            data["refresh"] = str(refresh)

        return data

class MyTokenRefreshPairView(jwt_views.TokenRefreshView):
    serializer_class = MyTokenRefreshPairSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user
        refresh = self.get_token(user)
        # Add extra responses here
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        data['firstName'] = self.user.first_name
        data['lastName'] = self.user.last_name
        data['isAssociation'] = self.user.is_association
        data['isActive'] = self.user.is_active
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer 
