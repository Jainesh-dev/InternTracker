import requests

response = requests.put(
    "http://127.0.0.1:5001/applications/1",
    json={
        "status": "Interview"
    }
)

print(response.json())