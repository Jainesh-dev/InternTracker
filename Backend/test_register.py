import requests

response = requests.post(
    "http://127.0.0.1:5001/register",
    json={
        "name": "Jainesh",
        "email": "jainesh30@gmail.com",
        "password": "1234567"
    }
)
print(response.json())