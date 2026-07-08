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
                work_type,
                skills,
                experience,
                degree,
                salary,
                duration,
                description,
                apply_link,
                source,
                category
            )

            VALUES
            (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)

            ON CONFLICT (apply_link)
            DO NOTHING
            """,

            (
                (
                job["company"],
                job["role"],
                job["location"],
                job["work_type"],
                job["skills"],
                job["experience"],
                job["degree"],
                job["salary"],
                job["duration"],
                job["description"],
                job["apply_link"],
                job["source"],
                job["category"]
                )
            )
        )

        conn.commit()

    finally:

        cursor.close()

        conn.close()

def get_active_companies():

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            company_name,
            ats,
            slug
        FROM companies
        WHERE active = TRUE
    """)

    companies = cursor.fetchall()

    cursor.close()
    conn.close()

    return companies        