from django.test import TestCase
from .models import Video, validar_link_youtube
from django.core.exceptions import ValidationError
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
