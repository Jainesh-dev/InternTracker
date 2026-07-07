from registry import CONNECTORS
from pipeline import process_jobs


def run_engine():

    total_jobs = 0
    total_saved = 0

    for connector in CONNECTORS:

        print(f"\nRunning {connector['name']} Connector")

        jobs = connector["fetch"]()

        total_jobs += len(jobs)

        saved, normalized_jobs = process_jobs(jobs)

        total_saved += saved

    print()
    print("=" * 40)
    print("ENGINE REPORT")
    print("=" * 40)
    print(f"Jobs Found        : {len(jobs)}")
    print(f"Unique Jobs       : {len(normalized_jobs)}")
    print(f"Jobs Processed    : {saved}")
    print("=" * 40)


if __name__ == "__main__":
    run_engine()