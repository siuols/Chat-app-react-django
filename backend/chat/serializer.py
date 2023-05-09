from rest_framework.serializers import ModelSerializer, SlugRelatedField
from .models import Room, Message

class RoomSerializer(ModelSerializer):
    
    class Meta:
        model = Room
        fields = '__all__'
        
class MessageSerializer(ModelSerializer):
    username = SlugRelatedField(read_only=True, slug_field='username')
    class Meta:
        model = Message
        fields = ['content', 'username']