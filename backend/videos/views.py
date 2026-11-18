from django.shortcuts import render
from rest_framework import viewsets
from .models import Video, Anime
from .serializers import VideoSerializer, AnimeSerializer

# Create your views here.
class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer

class AnimeViewSet(viewsets.ModelViewSet):
    queryset = Anime.objects.all()
    serializer_class = AnimeSerializer
