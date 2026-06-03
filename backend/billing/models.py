from django.db import models
from django.contrib.auth.models import User

class Plan(models.Model):
    name = models.CharField(max_length=50)
    price = models.FloatField(null=True, blank=True)
    currency = models.CharField(max_length=10, default="USD")
    description = models.TextField(blank=True,null=True)
    def __str__(self):
        return self.name

class Subscription(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    plan = models.ForeignKey(Plan,on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    start_date = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField(blank=True,null=True)