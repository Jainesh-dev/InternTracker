import requests

response = requests.post(
    "http://127.0.0.1:5001/register",
    json={
        "name": "Jainesh",
        "email": "jainesh2@gmail.com",
        "password": "123456"
    }
)

print(response.json())