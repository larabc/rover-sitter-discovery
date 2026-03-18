from rest_framework import serializers
from .models import Sitter, AvailableSlot


class SitterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sitter
        fields = "__all__"


class AvailableSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = AvailableSlot
        fields = "__all__"
