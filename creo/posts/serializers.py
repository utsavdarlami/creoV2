from rest_framework import serializers
from posts.models import Posts,CommentPost,Likes,Saves
from user.serializers import UserSerializer


"""
    Serialization allows the data such as querysets and model instances to be converted to native Python datatypes that can then be easily rendered into JSON,XML or other content types
"""

# Post Serializer
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posts
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    """
        Comment Create,Retrieve And Delete Serializer
    """
    post = PostSerializer(required=False)
    post_id = serializers.IntegerField()

    class Meta:
        model = CommentPost
        fields = '__all__'

    def create(self, validated_data):
        # print(validated_data)
        post_validated_data = {}
        post_data = validated_data.pop('post',None)
        # print(post_data)

        instance_post = Posts.objects.get(pk=validated_data["post_id"])
        # print(instance_post.data)
        instance_serializer = PostSerializer(instance_post)

        post_data = instance_serializer.data

        comment_count = post_data.pop("comment_count")

        post_validated_data["comment_count"] = comment_count + 1
        # print(like_count)
        # instance_post.save()

        post = PostSerializer.update(PostSerializer(),instance_post,validated_data=post_validated_data)
        # validated_data["publisher"] = self.request.user
        commented = CommentPost.objects.create(post=post,**validated_data)

        return post,commented

class CommentUserSerializer(serializers.ModelSerializer):
    """
        Comment Create,Retrieve And Delete Serializer
    """
    publisher = UserSerializer(required=False)
    publisher_id = serializers.IntegerField()

    class Meta:
        model = CommentPost
        fields = '__all__'

class LikeUserSerializer(serializers.ModelSerializer):
    publisher = UserSerializer(required=True)
    class Meta:
        model = Likes
        fields = '__all__'

class LikeSerializer(serializers.ModelSerializer):
    """ #Like Create,Retrieve And Delete Serializer
    """
    post = PostSerializer(required=False)
    post_id = serializers.IntegerField()

    class Meta:
        model = Likes
        fields = '__all__'

    def create(self, validated_data):
        # print(validated_data)
        post_validated_data = {}
        post_data = validated_data.pop('post',None)
        # print(post_data)

        instance_post = Posts.objects.get(pk=validated_data["post_id"])
        # print(instance_post.data)
        instance_serializer = PostSerializer(instance_post)

        post_data = instance_serializer.data

        like_count = post_data.pop("like_count")

        post_validated_data["like_count"] = like_count + 1
        # print(like_count)
        # instance_post.save()

        post = PostSerializer.update(PostSerializer(),instance_post,validated_data=post_validated_data)
        # validated_data["publisher"] = self.request.user
        liked = Likes.objects.create(post=post,**validated_data)

        return post,liked

class SaveSerializer(serializers.ModelSerializer):

    post = PostSerializer(required=False)
    post_id = serializers.IntegerField()

    class Meta:
        model = Saves
        fields = '__all__'

    def create(self, validated_data):
        post = validated_data.pop('post',None)

        post = Posts.objects.get(pk=validated_data["post_id"])
        save = Saves.objects.create(post=post,**validated_data)

        return post,save
