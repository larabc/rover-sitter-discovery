from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
import datetime
from .models import Sitter, AvailableSlot
from .serializers import SitterSerializer, AvailableSlotSerializer


class AvailableSlotViewSet(viewsets.ModelViewSet):
    queryset = AvailableSlot.objects.all()
    serializer_class = AvailableSlotSerializer

    def list(self, request):
        try:
            id = int(request.query_params.get("id"))

        except (ValueError, TypeError):
            return Response(
                {"error": "id must be a valid number"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        slots = AvailableSlot.objects.filter(sitter_id=id)
        serializer = AvailableSlotSerializer(slots, many=True)

        return Response(serializer.data)


class SitterViewSet(viewsets.ModelViewSet):
    queryset = Sitter.objects.all()
    serializer_class = SitterSerializer


class SitterSearchView(APIView):
    def get(self, request):
        date_str = request.query_params.get("date")
        start_time_str = request.query_params.get("start_time")
        end_time_str = request.query_params.get("end_time")

        weekday_from_date = datetime.date.fromisoformat(date_str).weekday()

        slots = AvailableSlot.objects.filter(
            day_of_week=weekday_from_date,
            start_time__lte=start_time_str,
            end_time__gte=end_time_str,
        )

        sitters = Sitter.objects.filter(available_slots__in=slots)
        serializer = SitterSerializer(sitters, many=True)

        return Response(serializer.data)
