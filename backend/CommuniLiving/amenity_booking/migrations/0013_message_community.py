# Generated by Django 4.2.6 on 2023-11-17 13:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('amenity_booking', '0012_message'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='community',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='amenity_booking.community'),
        ),
    ]
