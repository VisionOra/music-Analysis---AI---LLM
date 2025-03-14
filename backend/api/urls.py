# backend/api/urls.py

from django.urls import path
from .views import analyze_track

urlpatterns = [
    path('analyze-track/', analyze_track, name='analyze_track'),
]
