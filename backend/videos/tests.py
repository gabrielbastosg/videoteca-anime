from django.test import TestCase
from .models import Video, validar_link_youtube, Anime
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from rest_framework.test import APITestCase
# Create your tests here.

class YoutubeIdTest(TestCase):
    def test_youtu_be_com_tempo(self):
        video = Video(link='https://youtu.be/abc123?t=30')
        self.assertEqual(video.youtube_id, 'abc123')

    def test_watch_com_tempo(self):
        video = Video(link='https://www.youtube.com/watch?v=abc123&t=30s')
        self.assertEqual(video.youtube_id, 'abc123')

    def test_shorts(self):
        video = Video(link='https://www.youtube.com/shorts/abc123')
        self.assertEqual(video.youtube_id, 'abc123')


class ValidarLinkTest(TestCase):
    def test_link_fora_do_youtube(self):
        with self.assertRaises(ValidationError):
            validar_link_youtube('https://www.google.com')

    
    def test_link_do_youtube(self):
        validar_link_youtube('https://www.youtube.com/watch?v=abc123')

class IsolamentoTest(APITestCase):
    def test_amigo_nao_ve_meus_videos(self):
        eu = User.objects.create_user(username='eu')
        amigo = User.objects.create_user(username='amigo')

        bleach = Anime.objects.create(nome='Bleach', dono=eu)
        Video.objects.create(titulo='Edit do Bleach', anime=bleach, link='https://youtu.be/abc123', dono=eu)

        self.client.force_authenticate(user=amigo)
        resposta = self.client.get('/api/videos/')

        self.assertEqual(resposta.status_code, 200)
        self.assertEqual(resposta.json(), [])