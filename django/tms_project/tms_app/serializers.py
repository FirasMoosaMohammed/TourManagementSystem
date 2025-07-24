from rest_framework import serializers
from .models import TourPackage, PackageImage, Schedule, Enquiry

class PackageImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PackageImage
        fields = ['id', 'image','package']

    def get_image(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.image.url) if request else obj.image.url

class TourPackageSerializer(serializers.ModelSerializer):
    images = PackageImageSerializer(many=True, read_only=True)

    class Meta:
        model = TourPackage
        fields = ['id', 'title', 'origin', 'destination', 'base_amount', 'itinerary', 'images']

class ScheduleSerializer(serializers.ModelSerializer):
    package = serializers.PrimaryKeyRelatedField(
        queryset=TourPackage.objects.all()
    )
    package_details = TourPackageSerializer(source='package', read_only=True)
    class Meta:
        model = Schedule
        fields = ['id', 'title', 'start_date', 'end_date', 'package','package_details']

class EnquirySerializer(serializers.ModelSerializer):
    package = TourPackageSerializer(read_only=True)
    schedule = ScheduleSerializer(read_only=True)
    package_id = serializers.PrimaryKeyRelatedField(queryset=TourPackage.objects.all(), source='package', write_only=True, required=False)
    schedule_id = serializers.PrimaryKeyRelatedField(queryset=Schedule.objects.all(), source='schedule', write_only=True, required=False)
    class Meta:
        model = Enquiry
        fields = ['id', 'name', 'mobile', 'email', 'message',
            'package', 'schedule',         
            'package_id', 'schedule_id',   
            'created_at']
