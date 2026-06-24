import psycopg2
import bcrypt
import os
from dotenv import load_dotenv
load_dotenv()
def get_db_connection():
    return psycopg2.connect(
        host=os.getenv("DB_HOST"),
        database=os.getenv("DB_NAME"),
        user=os.getenv("DB_User"),
        password=os.getenv("DB_PASSWORD"),
        port="5432"
)


def get_all_internships():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM internships")

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return rows


def save_internship(internship_id):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO saved_internships (internship_id) VALUES (%s)",
        (internship_id,)
    )

    conn.commit()

    cursor.close()
    conn.close()


# NEW FUNCTION
def get_saved_internships():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
    SELECT
        internships.id,
        internships.company,
        internships.role,
        internships.location,
        internships.work_type,
        internships.category,
        internships.apply_link
    FROM saved_internships
    JOIN internships
    ON saved_internships.internship_id = internships.id
    """)

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return rows

def delete_saved_internship(internship_id):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM saved_internships WHERE internship_id = %s",
        (internship_id,)
    )

    conn.commit()

    cursor.close()
    conn.close()
from datetime import date


def apply_to_internship(internship_id):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO applications
        (internship_id, status, applied_date)
        VALUES (%s, %s, %s)
        """,
        (
            internship_id,
            "Applied",
            date.today()
        )
    )

    conn.commit()

    cursor.close()
    conn.close()    
def get_all_applications():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            applications.id,
            internships.company,
            internships.role,
            applications.status,
            applications.applied_date
        FROM applications
        JOIN internships
        ON applications.internship_id = internships.id
    """)

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return rows
def update_application_status(application_id, status):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        UPDATE applications
        SET status = %s
        WHERE id = %s
        """,
        (status, application_id)
    )

    conn.commit()

    cursor.close()
    conn.close()  

def create_User(name, email, password):
    conn = get_db_connection()
    cursor = conn.cursor()

    hashed_password = bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    )

    try:
        cursor.execute(
            """
            INSERT INTO Users
            (name, email, password)
            VALUES (%s, %s, %s)
            """,
            (
                name,
                email,
                hashed_password.decode("utf-8")
            )
        )

        conn.commit()

        return {
            "success": True,
            "message": "User registered successfully"
        }

    except psycopg2.Error:
        return {
            "success": False,
            "message": "Email already exists"
        }

    finally:
        cursor.close()
        conn.close()
        
def get_User_by_email(email):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
          SELECT
            id,
            name,
            email,
            password,
            onboarding_completed
        FROM Users
        WHERE email = %s """,
        (email,)
    )

    User = cursor.fetchone()

    cursor.close()
    conn.close()

    return User     

def complete_onboarding(user_id):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        UPDATE Users
        SET onboarding_completed = TRUE
        WHERE id = %s
        """,
        (user_id,)
    )

    conn.commit()

    cursor.close()
    conn.close()
     
def create_google_User(name, email):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            """
            INSERT INTO Users
            (name, email, password)
            VALUES (%s, %s, %s)
            """,
            (
                name,
                email,
                None
            )
        )

        conn.commit()

        return {
            "success": True,
            "message": "Google User created"
        }

    except psycopg2.Error:
        return {
            "success": False,
            "message": "Email already exists"
        }

    finally:
        cursor.close()
        conn.close()  