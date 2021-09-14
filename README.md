# Creo Version 2

### Team

- Babin Joshi
- Gyanas Luitel 
- Niraj Tamang
- Utsav Darlami

## For Django Server

```
$ pipenv shell 
$ pipenv install
$ cd creo
$ python manage.py runserver 
```

## For React frontend

```
$ cd frontend
$ npm install
$ npm start
```

# Overview

## Backend - Django 

- Django Rest Framework(DRF) - To create REST apis - (REST - Representational state transfer)
- Serializers 
    - Serialization :
        - Allow complex data such as querysets and model instances to be converted to native Python datatypes that can then be easily rendered into JSON, XML or other content types. 
            - **[model instances -> serialize -> json]**
    - Deserialization :
        - Also provide deserialization, allowing parsed data to be converted back into complex types, after first validating the incoming data
            - **[ json/raw data -> serialize -> model instance]** 
- Models :
    - this provides an object-relational mapper (ORM) that automates the transfer of data stored in relational database tables into python objects 
    - Created 5 models with extra 2 models , 1 model i.e User which is created default by django and AuthToken model by django-rest-knox
    - model maps to a single database table. 
- Why REST :
    - **Client–server** – By separating the user interface concerns from the data storage concerns, we improve the portability of the user interface across multiple platforms and improve scalability by simplifying the server components.
    - **Stateless** – Each request from client to server must contain all of the information necessary to understand the request, and cannot take advantage of any stored context on the server. Session state is therefore kept entirely on the client.
- Token Authentication 
    - appropriate for client and server setups
    - For clients to authenticate, the token key should be included in the Authorization HTTP header. 
    - used a library called django-rest-knox for using django authentication
        - Knox authentication is token based, similar to the TokenAuthentication built in to DRF. However, 
        - DRF tokens are limited to one per user. This does not facilitate securely signing in from multiple devices, as the token is shared. It also requires all devices to be logged out if a server-side logout is required (i.e. the token is deleted).
        - Knox provides one token per call to the login view - allowing each client to have its own token which is deleted on the server side when the client logs out.
        - Knox also provides an option for a logged in client to remove all tokens that the server has - forcing all clients to re-authenticate.
        - DRF tokens track their creation time, but have no inbuilt mechanism for tokens expiring. Knox tokens can have an expiry configured in the app settings (default is 10 hours.)
- Password 
    - Django uses the PBKDF2 algorithm with a SHA256 hash, a password stretching mechanism recommended by NIST.  for storing password1

## Frontend - React

- React is a JavaScript library for building user interfaces
- used Reducer :
    - state management
    - View -> Action -> Reducer(s) -> Store -> View
- used Axios : 
    - for calling urls/apis  
    - Promise based HTTP client 

## Database - Sqlite3 

-  Default by django. It is embedded into the end program. .i.e is our backend server
-  It is an Relational Database (Use SQL[Structured Query Language])
    - A relational database is a type of database that stores and provides access to data points that are related to one another.
    - Relational databases are based on the relational model, an intuitive, straightforward way of representing data in tables. In a relational database, each row in the table is a record with a unique ID called the key.
    - The columns of the table hold attributes of the data, and each record usually has a value for each attribute, making it easy to establish the relationships among data points.

