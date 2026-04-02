from rest_framework import serializers
from .models import Sitter, AvailableSlot


class SitterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sitter
        fields = "__all__"

    def validate_email(self, value):

        if Sitter.objects.filter(email=value).exists():
            raise serializers.ValidationError("email already exists")
        return value


class AvailableSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = AvailableSlot
        fields = "__all__"
