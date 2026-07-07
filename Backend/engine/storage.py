import sys
import os

sys.path.append(
    os.path.dirname(
        os.path.dirname(
            os.path.abspath(__file__)
        )
    )
)

from database.db import get_db_connection


def save_job(job):

    conn = get_db_connection()

    cursor = conn.cursor()

    try:

        cursor.execute(
            """
            INSERT INTO engine_internships
            (
                company,
                role,
                location,
                description,
                apply_link,
                source,
                category
            )

            VALUES
            (%s,%s,%s,%s,%s,%s,%s)

            ON CONFLICT (apply_link)
            DO NOTHING
            """,

            (
                job["company"],
                job["role"],
                job["location"],
                job["description"],
                job["apply_link"],
                job["source"],
                job["category"]
            )
        )

        conn.commit()

    finally:

        cursor.close()

        conn.close()