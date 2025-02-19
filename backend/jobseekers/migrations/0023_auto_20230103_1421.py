# Generated by Django 3.1.6 on 2023-01-03 14:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('jobseekers', '0022_auto_20230102_1519'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='education',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='experience',
        ),
        migrations.AlterField(
            model_name='profileeducation',
            name='fromDate',
            field=models.CharField(blank=True, max_length=13),
        ),
        migrations.AlterField(
            model_name='profileeducation',
            name='profile',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='Education', to='jobseekers.profile'),
        ),
        migrations.AlterField(
            model_name='profileeducation',
            name='toDate',
            field=models.CharField(blank=True, max_length=13),
        ),
        migrations.AlterField(
            model_name='profileexperience',
            name='profile',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='Experience', to='jobseekers.profile'),
        ),
    ]
