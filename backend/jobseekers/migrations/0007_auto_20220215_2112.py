# Generated by Django 3.1.6 on 2022-02-15 21:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobseekers', '0006_profile_middlename'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='about',
            field=models.CharField(max_length=250),
        ),
    ]
