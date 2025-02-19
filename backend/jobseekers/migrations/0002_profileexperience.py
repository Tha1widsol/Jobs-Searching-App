# Generated by Django 3.1.6 on 2022-06-22 19:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('jobseekers', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProfileExperience',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('companyName', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('years', models.IntegerField()),
                ('reference', models.TextField()),
                ('location', models.TextField()),
                ('ongoing', models.BooleanField(default=False)),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='jobseekers.profile')),
            ],
        ),
    ]
