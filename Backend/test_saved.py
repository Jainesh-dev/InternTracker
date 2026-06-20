import requests

response = requests.get(
    "http://127.0.0.1:5001/saved"
)

print(response.status_code)
print(response.text)

TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo5LCJlbWFpbCI6ImphaW5lc2gzMEBnbWFpbC5jb20iLCJleHAiOjE3ODIwMjY5ODl9.p3pGRdoZLgeqExNKa4yBz3J7Q7jBReRfUvLLHgAi2rg"

response = requests.get(
    "http://127.0.0.1:5001/saved",
    headers={
        "Authorization": f"Bearer {TOKEN}"
    }
)

print(response.status_code)
print(response.text)