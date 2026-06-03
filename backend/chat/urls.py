from django.urls import path
from . import views

urlpatterns = [
    path('ask/', views.ifrs_chatbot, name='ask'),
    path('history/', views.chat_history, name='history'),
]