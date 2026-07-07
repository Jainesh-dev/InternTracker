from classifier import classify


def normalize_greenhouse_job(job):

    normalized_job = {

        "company": job.get("company_name", ""),

        "role": job.get("title", ""),

        "location": job.get(
            "location",
            {}
        ).get("name", ""),

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