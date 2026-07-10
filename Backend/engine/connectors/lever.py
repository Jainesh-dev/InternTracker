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
from skill_extractor import extract_skills   

def fetch_lever_jobs(slug):

    LEVER_URL = (
    f"https://api.lever.co/v0/postings/{slug}?mode=json"
)

    log_info("Connecting to Lever...")

    response = requests.get(LEVER_URL)

    if response.status_code != 200:
        log_error(
        f"Connection Failed (Status Code: {response.status_code})"
        )
        log_error(response.text)
        return []

    data = response.json()

    log_success("Connected Successfully")
    log_info(
    f"Found {len('jobs')} total jobs"
    )

    jobs = data

    internships = []

    keywords = [
        "intern",
        "internship",
        "co-op",
        "student"
    ]

    for job in jobs:

        title = job["text"].lower()

        if any(keyword in title for keyword in keywords):

            description = job.get("desciptionPlane", "")

            job["skills"] = extract_skills(description)

            internships.append(job)

    log_success(
    f"Filtered {len(internships)} internships"
    )

    return internships

if __name__ == "__main__":

    jobs = fetch_lever_jobs("")

    if jobs:
        print(jobs[0]["title"])
        print(jobs[0]["skills"])
    else:
        print("No jobs found.")