# Generated by Django 3.1.6 on 2022-09-10 12:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_user_savedjobs'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='savedjob',
            name='job',
        ),
    ]
