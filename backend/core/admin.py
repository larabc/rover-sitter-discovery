from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Sitter, AvailableSlot

admin.site.register(Sitter)
admin.site.register(AvailableSlot)
