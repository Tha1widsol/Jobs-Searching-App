# Generated by Django 3.1.6 on 2022-09-10 13:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0006_remove_user_savedjobs'),
        ('jobseekers', '0013_auto_20220910_1346'),
    ]

    operations = [
        migrations.DeleteModel(
            name='SavedJob',
        ),
    ]
