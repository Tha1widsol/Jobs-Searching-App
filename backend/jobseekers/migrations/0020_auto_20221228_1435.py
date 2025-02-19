# Generated by Django 3.1.6 on 2022-12-28 14:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobseekers', '0019_profileeducation'),
    ]

    operations = [
        migrations.RenameField(
            model_name='profileeducation',
            old_name='location',
            new_name='city',
        ),
        migrations.RenameField(
            model_name='profileeducation',
            old_name='school',
            new_name='country',
        ),
        migrations.RemoveField(
            model_name='profileeducation',
            name='level',
        ),
        migrations.AddField(
            model_name='profileeducation',
            name='institution',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='profileeducation',
            name='field',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='profileeducation',
            name='fromDate',
            field=models.CharField(blank=True, max_length=11),
        ),
        migrations.AlterField(
            model_name='profileeducation',
            name='toDate',
            field=models.CharField(blank=True, max_length=11),
        ),
    ]
