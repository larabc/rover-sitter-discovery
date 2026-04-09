from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
import datetime
from .models import Sitter, AvailableSlot, DateOverride
from .serializers import (
    SitterSerializer,
    AvailableSlotSerializer,
    DateOverrideSerializer,
)


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

        if not date_str or not start_time_str or not end_time_str:
            return Response(
                {"error": "date, start_time and end_time are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            weekday_from_date = datetime.date.fromisoformat(date_str).weekday()

        except ValueError:
            return Response(
                {"error": "invalid date format"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        overrides_for_date = DateOverride.objects.filter(date=date_str)

        available_overrides = overrides_for_date.filter(
            is_available=True,
            start_time__lte=start_time_str,
            end_time__gte=end_time_str,
        )

        weekly_slots_without_overrides = AvailableSlot.objects.exclude(
            sitter__in=overrides_for_date.values_list("sitter", flat=True),
        ).filter(
            day_of_week=weekday_from_date,
            start_time__lte=start_time_str,
            end_time__gte=end_time_str,
        )

        sitter_with_available_weekly_slots = Sitter.objects.filter(
            available_slots__in=weekly_slots_without_overrides
        )

        sitters_with_available_overrides = Sitter.objects.filter(
            date_overrides__in=available_overrides
        )

        sitters = (
            sitter_with_available_weekly_slots | sitters_with_available_overrides
        ).distinct()

        serializer = SitterSerializer(sitters, many=True)

        return Response(serializer.data)


class DateOverrideViewSet(viewsets.ModelViewSet):
    queryset = DateOverride.objects.all()
    serializer_class = DateOverrideSerializer

    def list(self, request):
        try:
            id = int(request.query_params.get("id"))

        except (ValueError, TypeError):
            return Response(
                {"error": "id must be a valid number"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        overrides = DateOverride.objects.filter(sitter_id=id)
        serializer = DateOverrideSerializer(overrides, many=True)

        return Response(serializer.data)
