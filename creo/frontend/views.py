from django.shortcuts import render

# Create your views here.

<<<<<<< HEAD

def index(request, post_id=None):
=======
def index(request,post_id=None):
    print(post_id)
>>>>>>> 2da9442df98f5119cac7ee4a607925f41ae5d37e
    return render(request, 'index.html')
