from rest_framework.test import APITestCase, APIClient
from ..models import Sitter, AvailableSlot


class AvailableSlotViewTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
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

    def test_get_slots_with_valid_id(self):
        response = self.client.get(f"/api/slots/?id={self.sitter.id}")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)

    def test_get_slots_without_id_returns_error(self):
        response = self.client.get(f"/api/slots/?id=''")
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data, {"error": "id must be a valid number"})

    def test_get_slots_with_invalid_id_returns_error(self):
        response = self.client.get(f"/api/slots/?id='test'")
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data, {"error": "id must be a valid number"})

    def test_get_slots_returns_empty_list(self):
        sitter_without_slots = Sitter.objects.create(
            name="Empty Sitter",
            email="empty@test.com",
            bio="",
            price_per_night=30.00,
            location="Madrid",
        )
        response = self.client.get(f"/api/slots/?id={sitter_without_slots.id}")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 0)

    def test_create_slot_with_valid_data(self):
        response = self.client.post(
            "/api/slots/",
            {
                "day_of_week": 1,
                "start_time": "10:00:00",
                "end_time": "14:00:00",
                "sitter": self.sitter.id,
            },
            format="json",
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(AvailableSlot.objects.count(), 2)

    def test_create_slot_with_invalid_data_returns_error(self):
        response = self.client.post(
            "/api/slots/",
            {
                "start_time": "10:00:00",
                "end_time": "14:00:00",
                "sitter": self.sitter.id,
            },
            format="json",
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(AvailableSlot.objects.count(), 1)

    def test_update_slot(self):
        response = self.client.put(
            f"/api/slots/{self.slot.id}/",
            {
                "day_of_week": 2,
                "start_time": "10:00:00",
                "end_time": "14:00:00",
                "sitter": self.sitter.id,
            },
            format="json",
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(AvailableSlot.objects.count(), 1)

    def test_update_nonexistent_slot_returns_error(self):
        response = self.client.put(
            f"/api/slots/4444/",
            {
                "day_of_week": 2,
                "start_time": "10:00:00",
                "end_time": "14:00:00",
                "sitter": self.sitter.id,
            },
            format="json",
        )
        self.assertEqual(response.status_code, 404)
        self.assertEqual(AvailableSlot.objects.count(), 1)

    def test_delete_slot_returns_204(self):
        response = self.client.delete(
            f"/api/slots/{self.slot.id}/",
        )
        self.assertEqual(response.status_code, 204)
        self.assertEqual(AvailableSlot.objects.count(), 0)

    def test_delete_nonexistent_slot_returns_error(self):
        response = self.client.delete(
            f"/api/slots/4444/",
        )
        self.assertEqual(response.status_code, 404)
        self.assertEqual(AvailableSlot.objects.count(), 1)
