from rest_framework import serializers
from posts.models import Posts

# Post Serializer
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posts
        fields = '__all__'

