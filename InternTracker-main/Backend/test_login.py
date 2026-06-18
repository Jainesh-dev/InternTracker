import requests

response = requests.post(
    "http://127.0.0.1:5001/login",
    json={
        "email": "jainesh@gmail.com",
        "password": "123456"
    }
)

print(response.json())