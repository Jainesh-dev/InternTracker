import requests

response = requests.post(
    "http://127.0.0.1:5001/login",
    json={
        "email": "jainesh30@gmail.com",
        "password": "1234567"
    }
)

print(response.status_code)
print(response.text)