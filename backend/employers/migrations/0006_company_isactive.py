# Generated by Django 3.1.6 on 2022-08-10 08:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employers', '0005_auto_20220614_2211'),
    ]

    operations = [
        migrations.AddField(
            model_name='company',
            name='isActive',
            field=models.BooleanField(default=False),
        ),
    ]
