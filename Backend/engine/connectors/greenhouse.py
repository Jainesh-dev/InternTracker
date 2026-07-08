import sys
import os

sys.path.append(
    os.path.dirname(
        os.path.dirname(__file__)
    )
)
import requests
from logger import (
    log_info,
    log_success,
    log_error
)

def fetch_greenhouse_jobs(slug):

    GREENHOUSE_URL = (
    f"https://api.greenhouse.io/v1/boards/{slug}/jobs?content=true"
    )

    log_info("Connecting to Greenhouse...")

    response = requests.get(GREENHOUSE_URL)

    if response.status_code != 200:
        log_error(
        f"Connection Failed (Status Code: {response.status_code})"
        )
        log_error(response.text)
        return []

    data = response.json()

    log_success("Connected Successfully")
    log_info(
    f"Found {len(data['jobs'])} total jobs"
    )

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

    log_success(
    f"Filtered {len(internships)} internships"
    )

    return internships

if __name__ == "__main__":

    jobs = fetch_greenhouse_jobs("stripe")

    if jobs:
        print(jobs[0]["company_name"])
        print(jobs[0]["title"])
    else:
        print("No jobs found.")