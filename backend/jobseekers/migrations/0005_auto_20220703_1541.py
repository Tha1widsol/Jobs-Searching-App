# Generated by Django 3.1.6 on 2022-07-03 14:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobseekers', '0004_auto_20220703_1518'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profileexperience',
            name='EmployerEmail',
            field=models.EmailField(blank=True, max_length=254),
        ),
    ]
