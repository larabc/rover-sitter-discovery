from django.test import TestCase
from ..models import Sitter, AvailableSlot


class AvailableSlotModelTests(TestCase):
    def setUp(self):
        self.sitter = Sitter.objects.create(
            name="Test Sitter",
            email="test@test.com",
            bio="Test bio",
            price_per_night=50.00,
            location="Barcelona",
        )
        self.slot = AvailableSlot.objects.create(
            sitter=self.sitter,
            day_of_week=0,
            start_time="09:00:00",
            end_time="18:00:00",
        )

    def test_str_returns_sitter_name(self):
        self.assertEqual(str(self.sitter), "Test Sitter")

    def test_slot_creation(self):
        self.assertEqual(self.slot.day_of_week, 0)
        self.assertEqual(self.slot.start_time, "09:00:00")
        self.assertEqual(self.slot.end_time, "18:00:00")

    def test_slot_belongs_to_sitter(self):
        self.assertEqual(self.slot.sitter, self.sitter)
