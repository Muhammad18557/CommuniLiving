# Generated by Django 4.2.7 on 2023-12-01 22:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("amenity_booking", "0018_community_location_alter_community_join_pass"),
    ]

    operations = [
        migrations.AlterField(
            model_name="community",
            name="join_pass",
            field=models.CharField(default="834461", max_length=6, unique=True),
        ),
    ]
