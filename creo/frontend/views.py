from django.shortcuts import render

# Create your views here.


def index(request, post_id=None):
    return render(request, 'index.html')
