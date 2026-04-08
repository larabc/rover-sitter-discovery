from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import (
    SitterViewSet,
    AvailableSlotViewSet,
    SitterSearchView,
    DateOverrideViewSet,
)


router = DefaultRouter()
router.register(r"sitters", SitterViewSet)
router.register(r"slots", AvailableSlotViewSet)
router.register(r"overrides", DateOverrideViewSet)

urlpatterns = [
    path("sitters/search/", SitterSearchView.as_view()),
] + router.urls
