# Generated by Django 3.1.6 on 2022-01-20 11:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobseekers', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='distance',
            field=models.TextField(default='Any'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='industry',
            field=models.TextField(default='Any'),
        ),
    ]
