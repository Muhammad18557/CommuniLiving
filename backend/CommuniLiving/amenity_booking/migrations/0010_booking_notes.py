# Generated by Django 4.2.7 on 2023-11-12 20:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        (
            "amenity_booking",
            "0009_remove_userprofile_email_remove_userprofile_password",
        ),
    ]

    operations = [
        migrations.AddField(
            model_name="booking", name="notes", field=models.TextField(blank=True),
        ),
    ]