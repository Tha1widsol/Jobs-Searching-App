# Generated by Django 3.1.6 on 2022-07-06 04:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobseekers', '0007_remove_profileexperience_companyname'),
    ]

    operations = [
        migrations.AddField(
            model_name='profileexperience',
            name='companyName',
            field=models.CharField(default=None, max_length=200),
            preserve_default=False,
        ),
    ]
