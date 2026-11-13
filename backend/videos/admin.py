from django.contrib import admin
from .models import Anime, Video
# Register your models here.

admin.site.register(Anime)
@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ['titulo','tipo','anime']