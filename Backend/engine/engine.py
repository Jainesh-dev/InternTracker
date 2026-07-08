from registry import CONNECTORS
from pipeline import process_jobs
from promoter import promote_jobs
from storage import get_active_companies
from logger import (
    log_info,
    log_success
)


def run_engine():

    total_jobs = 0
    total_saved = 0

    companies = get_active_companies()

    for company in companies:

        company_name = company[0]
        ats = company[1]
        slug = company[2]

        connector = CONNECTORS.get(ats)

        if connector is None:
            continue

        log_info(
            f"Running {company_name} ({ats})"
        )

        jobs = connector(slug)

        total_jobs += len(jobs)

        saved, normalized_jobs = process_jobs(jobs)

        promoted = promote_jobs(normalized_jobs)

        log_success(
            f"Promoted {promoted} internships"
        )

        total_saved += saved

    print()
    print("=" * 40)
    print("ENGINE REPORT")
    print("=" * 40)
    print(f"Companies Scanned : {len(companies)}")
    print(f"Jobs Found        : {total_jobs}")
    print(f"Jobs Processed    : {total_saved}")
    print("=" * 40)


if __name__ == "__main__":
    run_engine()