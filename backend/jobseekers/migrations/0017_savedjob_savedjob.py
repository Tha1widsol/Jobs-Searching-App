# Generated by Django 3.1.6 on 2022-09-10 13:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('employers', '0006_company_isactive'),
        ('jobseekers', '0016_remove_savedjob_savedjob'),
    ]

    operations = [
        migrations.AddField(
            model_name='savedjob',
            name='savedJob',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='employers.job'),
        ),
    ]
