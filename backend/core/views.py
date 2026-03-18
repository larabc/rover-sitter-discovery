from rest_framework import viewsets
from .models import Sitter, AvailableSlot
from .serializers import SitterSerializer, AvailableSlotSerializer


class AvailableSlotViewSet(viewsets.ModelViewSet):
    queryset = AvailableSlot.objects.all()
    serializer_class = AvailableSlotSerializer


class SitterViewSet(viewsets.ModelViewSet):
    queryset = Sitter.objects.all()
    serializer_class = SitterSerializer
