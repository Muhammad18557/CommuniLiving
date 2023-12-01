# Generated by Django 4.2.7 on 2023-12-01 03:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("amenity_booking", "0017_alter_community_join_pass"),
    ]

    operations = [
        migrations.AddField(
            model_name="community",
            name="location",
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name="community",
            name="join_pass",
            field=models.CharField(default="446644", max_length=6, unique=True),
        ),
    ]
