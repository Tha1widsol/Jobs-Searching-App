# Generated by Django 3.1.6 on 2023-01-02 14:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobseekers', '0020_auto_20221228_1435'),
    ]

    operations = [
        migrations.AddField(
            model_name='profileeducation',
            name='education',
            field=models.TextField(blank=True),
        ),
    ]
