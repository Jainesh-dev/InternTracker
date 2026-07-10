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

def get_all_internships():

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            company,
            role,
            location,
            work_type,
            skills,
            category,
            apply_link
        FROM engine_internships
    """)

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    internships = []

    for row in rows:
        internships.append({
            "company": row[0],
            "role": row[1],
            "location": row[2],
            "work_type": row[3],
            "skills": row[4] or [],
            "category": row[5],
            "apply_link": row[6]
        })

    return internships

def get_user_profile(user_id):

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT
            skills,
            interests,
            preferred_locations
        FROM user_profiles
        WHERE user_id=%s
        """,
        (user_id,)
    )

    profile = cursor.fetchone()

    cursor.close()
    conn.close()

    return profile