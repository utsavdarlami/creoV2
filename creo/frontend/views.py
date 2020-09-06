from django.shortcuts import render

# Create your views here.

def index(request,post_id=None):
    print(post_id)
    return render(request, 'index.html')
