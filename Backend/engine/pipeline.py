from normalizer import normalize_greenhouse_job
from deduplicator import remove_duplicates
from storage import save_job


def process_jobs(jobs):

    normalized_jobs = []

    # Normalize
    for job in jobs:
        normalized_jobs.append(
            normalize_greenhouse_job(job)
        )

    # Deduplicate
    normalized_jobs = remove_duplicates(
        normalized_jobs
    )

    # Store
    saved = 0

    for job in normalized_jobs:
        save_job(job)
        saved += 1

    return saved, normalized_jobs