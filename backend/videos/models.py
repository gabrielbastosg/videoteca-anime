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
        return self.link.split('v=')[1]

    def __str__(self):
        return self.titulo