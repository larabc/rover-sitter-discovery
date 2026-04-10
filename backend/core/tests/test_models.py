from django.test import TestCase
from ..models import Sitter, AvailableSlot
from django.db import IntegrityError


class AvailableSlotModelTests(TestCase):
    def setUp(self):
        self.sitter = Sitter.objects.create(
            name="Test Sitter",
            email="test@test.com",
            bio="Test bio",
            price=50.00,
            location="Barcelona",
        )
        self.slot = AvailableSlot.objects.create(
            sitter=self.sitter,
            day_of_week=0,
            start_time="09:00:00",
            end_time="18:00:00",
        )

    def test_slot_str(self):
        expected = (
            f"Test Sitter - {self.slot.get_day_of_week_display()} 09:00:00-18:00:00"
        )
        self.assertEqual(str(self.slot), expected)

    def test_slot_creation(self):
        self.assertEqual(self.slot.day_of_week, 0)
        self.assertEqual(self.slot.start_time, "09:00:00")
        self.assertEqual(self.slot.end_time, "18:00:00")

    def test_slot_belongs_to_sitter(self):
        self.assertEqual(self.slot.sitter, self.sitter)


class SitterModelTests(TestCase):
    def setUp(self):
        self.sitter = Sitter.objects.create(
            name="Ananda",
            email="ananda@gmail.com",
            bio="hello :D",
            price=23,
            location="Barcelona",
        )

    def test_str_returns_sitter_name(self):
        self.assertEqual(str(self.sitter), "Ananda")

    def test_sitter_creation(self):
        self.assertEqual(self.sitter.name, "Ananda")
        self.assertEqual(self.sitter.email, "ananda@gmail.com")
        self.assertEqual(self.sitter.location, "Barcelona")
        self.assertEqual(self.sitter.bio, "hello :D")
        self.assertEqual(self.sitter.price, 23)

    def test_email_is_unique(self):
        with self.assertRaises(IntegrityError):
            Sitter.objects.create(
                name="Otro Sitter",
                email="ananda@gmail.com",
                bio="",
                price=30,
                location="Madrid",
            )
