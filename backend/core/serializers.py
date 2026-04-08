from rest_framework import serializers
from .models import Sitter, AvailableSlot, DateOverride
from django.db.models import Q


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

    def validate(self, data):
        start_time = data["start_time"]
        end_time = data["end_time"]

        if start_time >= end_time:
            raise serializers.ValidationError(
                "start time has to be sooner than end time"
            )

        overlapping = AvailableSlot.objects.filter(
            sitter=data["sitter"],
            day_of_week=data["day_of_week"],
            start_time__lt=data["end_time"],
            end_time__gt=data["start_time"],
        )

        if self.instance:
            overlapping = overlapping.exclude(pk=self.instance.pk)

        if overlapping.exists():
            raise serializers.ValidationError(
                "This time overlaps with an existing slot"
            )

        return data

    def create(self, validated_data):
        contiguous = AvailableSlot.objects.filter(
            sitter=validated_data["sitter"],
            day_of_week=validated_data["day_of_week"],
        ).filter(
            Q(end_time=validated_data["start_time"])
            | Q(start_time=validated_data["end_time"])
        )

        if contiguous.exists():
            all_starts = [slot.start_time for slot in contiguous] + [
                validated_data["start_time"]
            ]
            all_ends = [slot.end_time for slot in contiguous] + [
                validated_data["end_time"]
            ]

            # Get the first start and last end in times
            merged_start = min(all_starts)
            merged_end = max(all_ends)

            # Reuse the first contiguous slot
            first = contiguous.first()
            first.start_time = merged_start
            first.end_time = merged_end
            first.save()

            # Delete other contiguous (in case exists)
            contiguous.exclude(pk=first.pk).delete()

            return first

        return super().create(validated_data)


class DateOverrideSerializer(serializers.ModelSerializer):
    class Meta:
        model = DateOverride
        fields = "__all__"

    def validate(self, data):
        is_available = data["is_available"]
        date = data["date"]
        start_time = data.get("start_time")
        end_time = data.get("end_time")

        if not date:
            raise serializers.ValidationError("An override must provide a date")
        if not is_available:
            if start_time or end_time:
                raise serializers.ValidationError(
                    "An override can not be set as unavailable passing start or end time"
                )
        else:
            if not start_time or not end_time:
                raise serializers.ValidationError(
                    "An override must have start and end time"
                )

        return data
