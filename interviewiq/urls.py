from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from chatbot.views import ChatView

router = DefaultRouter()
router.register(r'chat', ChatView, basename='chat')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/', include('users.urls')),
] 