from rest_framework.routers import DefaultRouter
# from .views import TourPackageViewSet, ScheduleViewSet, PackageImageViewSet, EnquiryViewSet
from django.urls import path, include
from tms_app import views
from rest_framework.authtoken import views as authview

router = DefaultRouter()
router.register('packages', views.TourPackageViewSet,basename='package')
router.register('schedules', views.ScheduleViewSet,basename='schedule')
router.register('images', views.PackageImageViewSet,basename='package_image')
router.register('enquiries', views.EnquiryViewSet,basename='enquiry')

urlpatterns = [
    path('token',authview.obtain_auth_token),
    path('login/', views.LoginView.as_view(),name='login'),
    path('', include(router.urls)),
]
