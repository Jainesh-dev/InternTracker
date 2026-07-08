from storage import get_db_connection


def promote_jobs(jobs):

    conn = get_db_connection()
    cursor = conn.cursor()

    promoted = 0

    for job in jobs:

        cursor.execute(
            """
            INSERT INTO internships
            (
                company,
                role,
                location,
                work_type,
                category,
                apply_link
            )
            VALUES (%s,%s,%s,%s,%s,%s)
            ON CONFLICT (apply_link) DO NOTHING
            """,
            (
                job["company"],
                job["role"],
                job["location"],
                "Unknown",
                job["category"],
                job["apply_link"]
            )
        )

        promoted += cursor.rowcount

    conn.commit()

    cursor.close()
    conn.close()

    return promoted