from rest_framework import serializers
from .models import Video

class VideoSerializer(serializers.ModelSerializer):

    anime_nome = serializers.CharField(source='anime.nome',read_only=True)
    class Meta:
        model = Video
        fields = ['id','titulo','tipo','anime','anime_nome','link','youtube_id']
