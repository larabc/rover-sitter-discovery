from django.db import models


# Create your models here.
class Sitter(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    bio = models.TextField(blank=True)
    price_per_night = models.DecimalField(max_digits=6, decimal_places=2)
    location = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class AvailableSlot(models.Model):
    DAYS_OF_WEEK = [
        (0, "Monday"),
        (1, "Tuesday"),
        (2, "Wednesday"),
        (3, "Thursday"),
        (4, "Friday"),
        (5, "Saturday"),
        (6, "Sunday"),
    ]

    sitter = models.ForeignKey(
        Sitter, on_delete=models.CASCADE, related_name="available_slots"
    )
    day_of_week = models.IntegerField(choices=DAYS_OF_WEEK)
    start_time = models.TimeField()
    end_time = models.TimeField()

    def __str__(self):
        return f"{self.sitter.name} - {self.get_day_of_week_display()} {self.start_time}-{self.end_time}"


class DateOverride(models.Model):
    sitter = models.ForeignKey(
        Sitter, on_delete=models.CASCADE, related_name="date_overrides"
    )
    date = models.DateField()
    start_time = models.TimeField(null=True, blank=True)
    end_time = models.TimeField(null=True, blank=True)
    # False = blocked (sitter unavailable), True = extra availability
    is_available = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.sitter.name} - {self.date} ({'available' if self.is_available else 'blocked'})"
