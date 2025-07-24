from rest_framework import viewsets, permissions
from .models import TourPackage, PackageImage, Schedule, Enquiry
from .serializers import TourPackageSerializer, PackageImageSerializer, ScheduleSerializer, EnquirySerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.parsers import MultiPartParser, FormParser

    
class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if user:
            if not user.is_staff and user.is_superuser:
                return Response({'error': 'Only admin users can log in'}, status=status.HTTP_403_FORBIDDEN)
            
            token, created = Token.objects.get_or_create(user=user)
            role = "admin"

            return Response({
                "token": token.key,
                "role": role
            })

        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

class TourPackageViewSet(viewsets.ModelViewSet):
    queryset = TourPackage.objects.all()
    serializer_class = TourPackageSerializer
    permission_classes = [permissions.AllowAny] 

    def get_serializer_context(self):
        return {'request': self.request}

class ScheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    permission_classes = [permissions.AllowAny]

class PackageImageViewSet(viewsets.ModelViewSet):
    queryset = PackageImage.objects.all()
    serializer_class = PackageImageSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    parser_classes = [MultiPartParser, FormParser]

class EnquiryViewSet(viewsets.ModelViewSet):
    queryset = Enquiry.objects.all()
    serializer_class = EnquirySerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        schedule = serializer.validated_data.get("schedule")

        if schedule:
            serializer.save(package=schedule.package)
        else:
            serializer.save()
