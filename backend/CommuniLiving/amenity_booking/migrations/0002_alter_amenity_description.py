# Generated by Django 4.2.6 on 2023-10-26 01:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("amenity_booking", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="amenity",
            name="description",
            field=models.TextField(blank=True),
        ),
    ]
