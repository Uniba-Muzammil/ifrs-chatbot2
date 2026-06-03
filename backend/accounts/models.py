from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    country = models.CharField(max_length=5, default="PK")
    currency = models.CharField(max_length=5, default="PKR")
    basic_count = models.IntegerField(default=15)
    deep_count = models.IntegerField(default=1)  # 1 free deep mode
    is_paid = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username