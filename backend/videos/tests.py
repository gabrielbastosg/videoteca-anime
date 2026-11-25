from django.test import TestCase
from .models import Video
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