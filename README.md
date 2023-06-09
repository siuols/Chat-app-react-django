# Chat App (Real-time) in Django and React

# Description
This project shows how an chat app created in django as a backend and react as frontend

## Technology Stack
Backend: Django, Django Rest Framework, Django Corsheaders, Django Channels, Redis <br />
Frontend: ReactJS

## Prerequisites: 
Python3, Redis Server and virtual environment

## Plugins used:

Django: https://docs.djangoproject.com/en/4.0/topics/install/#installing-official-release<br />
Django Channels: https://channels.readthedocs.io/en/stable/index.html<br />
Django Corsheaders: https://pypi.org/project/django-cors-headers/<br />
DRF: https://www.django-rest-framework.org/<br />
DRF Channels: https://djangochannelsrestframework.readthedocs.io/en/latest/<br />
Redis: https://redis.io/docs/getting-started/installation/install-redis-on-linux/<br />
Redis-Server: https://pypi.org/project/redis-server/<br />
Node js: https://nodejs.org/en/download/package-manager<br />
VITE: https://www.npmjs.com/package/vite

## To run the project
1. Clone the app: git clone https://github.com/siuols/Chat-app-react-django.git
2. Backend
    1. Create virtual environment: virtualenv env
    2. Activate the environment ```bash $ source .env/bin/activate```
    3. Navigate inside the project ```bash $ cd backend```
    4. Install all the packages ```bash $ pip install -r requirements.txt```
    5. Migrate ```bash $ python manage.py migrate```
    6. Create a superuser ```bash $ python manage.py createsuperuser``` <br />
        Fill in all the details on the terminal to create the superuser
    7. Run the backend server ```bash $ python manage.py runserver```
    8. Visit the server link ```bash $ http://localhost:8000/```
3. Frontend
    1. Navigate inside the project ```bash $ cd frontend ```
    2. Install vite ```bash $ npm i vite```
    3. ```bash $ npm i ```
    4. ```bash $ npm run dev ```
    
## License
Distributed under the MIT License. See [LICENSE.txt](./LICENSE) for more information.
