from rest_framework import serializers
from .models import Video, Anime

class VideoSerializer(serializers.ModelSerializer):

    anime_nome = serializers.CharField(source='anime.nome',read_only=True)
    tipo_display = serializers.CharField(source='get_tipo_display', read_only=True)
    class Meta:
        model = Video
        fields = ['id','titulo','tipo','anime','anime_nome','link','youtube_id','tipo_display']

class AnimeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Anime
        fields = ['id','nome']