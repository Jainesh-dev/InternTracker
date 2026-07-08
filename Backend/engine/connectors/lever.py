import sys
import os
import requests
sys.path.append(
    os.path.dirname(
        os.path.dirname(__file__)
    )
)
from logger import (
    log_info,
    log_success,
    log_error
)

LEVER_URL = (
    "https://api.lever.co/v0/postings/postman?mode=json"
)


def fetch_lever_jobs():

    log_info("Connecting to Lever...")

    response = requests.get(LEVER_URL)

    if response.status_code != 200:
        log_error(
            f"Connection Failed ({response.status_code})"
        )
        return []

    jobs = response.json()

    log_success("Connected Successfully")

    log_info(
        f"Found {len(jobs)} total jobs"
    )

    return jobs

if __name__ == "__main__":
    jobs = fetch_lever_jobs()

if jobs:
    print(jobs[0])
else:
    print("No jobs returned.")