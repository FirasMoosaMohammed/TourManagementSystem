from django.db import models

class TourPackage(models.Model):
    title = models.CharField(max_length=255)
    origin = models.CharField(max_length=255)
    destination = models.CharField(max_length=255)
    base_amount = models.DecimalField(max_digits=10, decimal_places=2)
    itinerary = models.TextField()  

    def __str__(self):
        return self.title

class PackageImage(models.Model):
    package = models.ForeignKey(TourPackage, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='package_images/')

class Schedule(models.Model):
    package = models.ForeignKey(TourPackage, related_name='schedules', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self): 
        return self.title

class Enquiry(models.Model):
    name = models.CharField(max_length=100)
    mobile = models.CharField(max_length=15)
    email = models.EmailField()
    message = models.TextField()
    package = models.ForeignKey(TourPackage, on_delete=models.CASCADE, null=True, blank=True)
    schedule = models.ForeignKey(Schedule, on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
