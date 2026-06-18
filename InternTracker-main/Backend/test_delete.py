import requests

response = requests.delete(
    "http://127.0.0.1:5001/saved/1"
)

print(response.json())