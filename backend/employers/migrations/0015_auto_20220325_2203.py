# Generated by Django 3.1.6 on 2022-03-25 22:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employers', '0014_job_link'),
    ]

    operations = [
        migrations.AlterField(
            model_name='job',
            name='datePosted',
            field=models.DateField(auto_now_add=True, verbose_name='Job posted'),
        ),
    ]
