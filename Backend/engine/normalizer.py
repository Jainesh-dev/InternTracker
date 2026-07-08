from classifier import classify
from parser import parse_description

def normalize_greenhouse_job(job):
    parsed = parse_description(
    job.get("content","")
)

    normalized_job = {

        "company": job.get("company_name", ""),

        "role": job.get("title", ""),

        "location": job.get(
            "location",
            {}
        ).get("name", ""),

        "work_type": parsed["work_type"],

        "skills": parsed["skills"],

        "experience": parsed["experience"],

        "degree": parsed["degree"],

        "salary": parsed["salary"],

        "duration": parsed["duration"],

        "description": job.get(
            "content",
            ""
        ),

        "apply_link": job.get(
            "absolute_url",
            ""
        ),

        "source": "Greenhouse"
    }

    normalized_job["category"] = classify(normalized_job)

    return normalized_job