import requests

GREENHOUSE_URL = (
    "https://api.greenhouse.io/v1/boards/stripe/jobs?content=true"
)


def fetch_greenhouse_jobs():

    print("Connecting to Greenhouse...")

    response = requests.get(GREENHOUSE_URL)

    if response.status_code != 200:
        print("Connection Failed")
        print("Status Code:", response.status_code)
        print(response.text)
        return []

    data = response.json()

    print("Connected Successfully")
    print(f"Found {len(data['jobs'])} jobs")

    jobs = data["jobs"]

    internships = []

    keywords = [
        "intern",
        "internship",
        "co-op",
        "student"
    ]

    for job in jobs:

        title = job["title"].lower()

        if any(
            keyword in title
            for keyword in keywords
        ):
            internships.append(job)

    print(
        f"Found {len(internships)} internships"
    )

    return internships