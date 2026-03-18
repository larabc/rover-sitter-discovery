from rest_framework.routers import DefaultRouter
from .views import SitterViewSet, AvailableSlotViewSet

router = DefaultRouter()
router.register(r"sitters", SitterViewSet)
router.register(r"slots", AvailableSlotViewSet)

urlpatterns = router.urls
