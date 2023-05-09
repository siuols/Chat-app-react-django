from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RoomViewSet

router = DefaultRouter()

router.register('room', RoomViewSet, basename='room')

app_name = 'chat'

urlpatterns = [
    path('', include(router.urls)),
    path('<int:pk>', include(router.urls))
]