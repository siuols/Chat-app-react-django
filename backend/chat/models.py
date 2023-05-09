from django.db import models
from django.contrib.auth.models import User
from django.core import serializers

class Room(models.Model):
    name                = models.CharField(max_length=255)

    def __str__(self):
        return '{}'.format(self.name)
    
    def related_messages(self):
        related_messages = Message.objects.filter(room=self)
        return serializers.serialize('json', related_messages)


class Message(models.Model):
    room                = models.ForeignKey(Room, related_name='room_message', on_delete=models.CASCADE)
    username            = models.ForeignKey(User, related_name='user_message', on_delete=models.CASCADE)
    content             = models.TextField()
    timestamp           = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '{} - {} - {}'.format(self.content, self.room, self.username)
    
    class Meta:
        ordering = ['timestamp']