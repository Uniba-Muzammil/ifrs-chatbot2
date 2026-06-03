from django.urls import path
from . import views

urlpatterns = [
    path('plans/', views.get_plans, name='plans'),
    path('checkout/', views.checkout, name='checkout'),
]