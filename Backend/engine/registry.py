from connectors.greenhouse import fetch_greenhouse_jobs

CONNECTORS = [
    {
        "name": "Greenhouse",
        "fetch": fetch_greenhouse_jobs
    }
]