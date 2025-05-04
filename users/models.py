from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.translation import gettext_lazy as _

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractUser):
    # Remove username field as we'll use email
    username = None
    email = models.EmailField(_('email address'), unique=True)
    
    # Add your custom fields
    name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    role = models.CharField(max_length=20, default='user')
    created_at = models.DateTimeField(auto_now_add=True)

    # Use email as the unique identifier
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'surname']

    objects = CustomUserManager()

    class Meta:
        db_table = 'users'  # Use your existing table name
        managed = True  # Allow Django to manage this table

    def __str__(self):
        return f"{self.name} {self.surname}"
