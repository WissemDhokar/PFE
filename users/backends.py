from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model
import bcrypt

class CustomAuthBackend(ModelBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        UserModel = get_user_model()
        try:
            user = UserModel.objects.get(email=email)
            # Verify password using bcrypt
            if bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
                return user
        except UserModel.DoesNotExist:
            return None
        return None 