# Generated by Django 3.1.6 on 2022-10-30 21:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_match'),
    ]

    operations = [
        migrations.AddField(
            model_name='skill',
            name='generic',
            field=models.BooleanField(default=True),
        ),
    ]
