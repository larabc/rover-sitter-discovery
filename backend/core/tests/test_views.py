from rest_framework.test import APITestCase, APIClient
from ..models import Sitter, AvailableSlot


class AvailableSlotViewTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
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
            price=30.00,
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

    def test_create_slot_with_contiguous_slot_merge(self):
        self.slot = AvailableSlot.objects.create(
            sitter=self.sitter,
            day_of_week=1,
            start_time="09:00:00",
            end_time="10:00:00",
        )

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

    def test_create_slot_with_start_time_greater_than_end_time_returns_error(self):
        response = self.client.post(
            "/api/slots/",
            {
                "start_time": "14:00:00",
                "end_time": "10:00:00",
                "day_of_week": 2,
                "sitter": self.sitter.id,
            },
            format="json",
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(
            response.data["non_field_errors"][0],
            "start time has to be sooner than end time",
        )
        self.assertEqual(AvailableSlot.objects.count(), 1)

    def test_create_slot_with_overlapped_slot_returns_error(self):
        response = self.client.post(
            "/api/slots/",
            {
                "day_of_week": 0,
                "start_time": "10:00:00",
                "end_time": "16:00:00",
                "sitter": 1,
            },
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(
            response.data["non_field_errors"][0],
            "This time overlaps with an existing slot",
        )
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

    def test_update_slot_does_not_overlap_with_itself(self):
        response = self.client.put(
            f"/api/slots/{self.slot.id}/",
            {
                "day_of_week": 0,
                "start_time": "09:00:00",
                "end_time": "19:00:00",
                "sitter": self.sitter.id,
            },
            format="json",
        )
        self.assertEqual(response.status_code, 200)

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


class SitterViewSet(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.sitter = Sitter.objects.create(
            name="Test Sitter",
            email="test@test.com",
            bio="Test bio",
            price=50.00,
            location="Barcelona",
        )

    def test_create_sitter_returns_201(self):
        response = self.client.post(
            "/api/sitters/",
            {
                "name": "Otro Sitter",
                "email": "test1@test.com",
                "bio": "",
                "price": 30,
                "location": "Madrid",
            },
        )
        self.assertEqual(response.status_code, 201)

    def test_create_sitter_with_duplicate_email_returns_400(self):
        response = self.client.post(
            "/api/sitters/",
            {
                "name": "Otro Sitter",
                "email": "test@test.com",
                "bio": "",
                "price": 30,
                "location": "Madrid",
            },
            format="json",
        )

        self.assertEqual(response.status_code, 400)


class SitterSearchView(APITestCase):
    def setUp(self):
        self.client = APIClient()
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

        self.monday_date = "2026-03-30"

    def test_search_returns_available_sitters(self):
        response = self.client.get(
            f"/api/sitters/search/?date={self.monday_date}&start_time=09:00:00&end_time=18:00:00"
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)

    def test_search_returns_empty_list_when_no_sitters_available(self):
        response = self.client.get(
            f"/api/sitters/search/?date={self.monday_date}&start_time=06:00:00&end_time=08:00:00"
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 0)

    def test_search_without_date_returns_error(self):
        response = self.client.get(
            f"/api/sitters/search/?start_time=09:00:00&end_time=18:00:00"
        )

        self.assertEqual(response.status_code, 400)
        self.assertEqual(
            response.data, {"error": "date, start_time and end_time are required"}
        )

    def test_search_without_start_time_returns_error(self):
        response = self.client.get(
            f"/api/sitters/search/?date={self.monday_date}&end_time=18:00:00"
        )

        self.assertEqual(response.status_code, 400)
        self.assertEqual(
            response.data, {"error": "date, start_time and end_time are required"}
        )

    def test_search_without_end_time_returns_error(self):
        response = self.client.get(
            f"/api/sitters/search/?date={self.monday_date}&start_time=09:00:00"
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(
            response.data, {"error": "date, start_time and end_time are required"}
        )

    def test_search_with_invalid_date_returns_error(self):
        response = self.client.get(
            f"/api/sitters/search/?date='notadate'&start_time=09:00:00&end_time=18:00:00"
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data, {"error": "invalid date format"})
