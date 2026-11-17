from django.db import models

# Create your models here.
class Anime(models.Model):
    nome = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.nome

class Video(models.Model):
    titulo = models.CharField(max_length=200)
    tipo = models.CharField(max_length=100,choices=[('Edit','Edit'), ('Explained', 'Explained')],default='Edit')
    anime = models.ForeignKey(Anime, on_delete=models.PROTECT, related_name='videos')
    link = models.URLField(unique=True)

    @property
    def youtube_id(self):
        if 'youtu.be' in self.link:
            video_id = self.link.split('youtu.be/')[1]
        elif 'shorts/' in self.link:
            video_id = self.link.split('shorts/')[1]
        else:
            video_id = self.link.split('v=')[1]
        video_id = video_id.split('&')[0]
        video_id = video_id.split('?')[0]


        return video_id

    def __str__(self):
        return self.titulo