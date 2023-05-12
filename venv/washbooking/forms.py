from django import forms
from .models import Association

class UpdateAssociationImageForm(forms.ModelForm):
    class Meta:
        model = Association
        fields = ['profile_image']