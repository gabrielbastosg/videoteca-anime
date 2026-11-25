from django.shortcuts import render
from rest_framework import viewsets
from .models import Video, Anime
from .serializers import VideoSerializer, AnimeSerializer

# Create your views here.
class VideoViewSet(viewsets.ModelViewSet):
    serializer_class = VideoSerializer
    def get_queryset(self):
        return Video.objects.filter(dono=self.request.user)

class AnimeViewSet(viewsets.ModelViewSet):
    serializer_class = AnimeSerializer
    def get_queryset(self):
        return Anime.objects.filter(dono=self.request.user)
