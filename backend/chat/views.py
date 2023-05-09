from django.shortcuts import get_object_or_404
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response

from .models import Room, Message
from .serializer import RoomSerializer, MessageSerializer

# Create your views here.

class RoomViewSet(ViewSet):
    def list(self, request):
        rooms = Room.objects.all()
        serializer = RoomSerializer(rooms, many=True)
        return Response(serializer.data)
        
    def retrieve(self, request, pk=None):
        room = get_object_or_404(Room, pk=pk)
        message = Message.objects.filter(room=room)
        room_serializer = RoomSerializer(room)
        message_serializer = MessageSerializer(message, many=True)
        context = {
            'room': room_serializer.data,
            'message': message_serializer.data
        }
        return Response(context)