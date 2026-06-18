import requests

response = requests.post(
    "http://127.0.0.1:5001/apply/1"
)

print(response.json())