# Generated by Django 4.2.6 on 2023-11-06 15:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('amenity_booking', '0005_booking_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='amenity',
            name='description',
        ),
    ]