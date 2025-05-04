from django.urls import path
from .views import RegisterView, UserProfileView, CustomTokenObtainPairView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('user/', UserProfileView.as_view(), name='user-profile'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
] 