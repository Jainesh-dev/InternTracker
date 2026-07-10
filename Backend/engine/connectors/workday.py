import requests

url = (
    "https://honeywell.wd5.myworkdayjobs.com/"
    "wday/cxs/honeywell/HoneywellCareers/jobs"
)

payload = {
    "limit": 20,
    "offset": 0
}

response = requests.post(url, json=payload)

print(response.status_code)
print(response.text[:500])