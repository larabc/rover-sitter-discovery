from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import SitterViewSet, AvailableSlotViewSet, SitterSearchView


router = DefaultRouter()
router.register(r"sitters", SitterViewSet)
router.register(r"slots", AvailableSlotViewSet)

urlpatterns = [
    path("sitters/search/", SitterSearchView.as_view()),
] + router.urls
