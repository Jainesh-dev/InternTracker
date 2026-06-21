import bcrypt
import jwt
from google.oauth2 import id_token
from google.auth.transport import requests
from datetime import datetime, timedelta
from flask import current_app
from database.db import (
    get_all_internships,
    save_internship,
    get_saved_internships,
    delete_saved_internship,
    apply_to_internship,
    get_all_applications,
    update_application_status,
    create_user,
    create_google_user,
    get_user_by_email
)

def fetch_internships():
    internships = get_all_internships()

    result = []

    for row in internships:
        result.append({
            "id": row[0],
            "company": row[1],
            "role": row[2],
            "location": row[3],
            "type": row[4],
            "category": row[5],
            "applyLink": row[6]
        })

    return result


def add_saved_internship(internship_id):
    save_internship(internship_id)

    return {
        "message": "Internship saved successfully"
    }


# NEW FUNCTION
def fetch_saved_internships():
    internships = get_saved_internships()

    result = []

    for row in internships:
        result.append({
            "id": row[0],
            "company": row[1],
            "role": row[2],
            "location": row[3],
            "type": row[4],
            "category": row[5],
            "applyLink": row[6]
        })

    return result

def remove_saved_internship(internship_id):
    delete_saved_internship(internship_id)

    return {
        "message": "Internship removed successfully"
    }
def add_application(internship_id):
    apply_to_internship(internship_id)

    return {
        "message": "Application submitted successfully"
    }
def fetch_applications():
    applications = get_all_applications()

    result = []

    for row in applications:
        result.append({
            "id": row[0],
            "company": row[1],
            "role": row[2],
            "status": row[3],
            "applied_date": str(row[4])
        })

    return result

def update_application(application_id, status):
    update_application_status(application_id, status)

    return {
        "message": f"Application status updated to {status}"
    }

def register_user(name, email, password):
    return create_user(
        name,
        email,
        password
    )
def login_user(email, password):
    user = get_user_by_email(email)

    if not user:
        return {
            "success": False,
            "message": "User not found"
        }
    
    if user[3] is None:
        return {
        "success": False,
        "message": "Please login with Google"
    }

    if not bcrypt.checkpw(
        password.encode("utf-8"),
        user[3].encode("utf-8")
    ):
        return {
            "success": False,
            "message": "Invalid password"
        }

    token = jwt.encode(
        {
            "user_id": user[0],
            "email": user[2],
            "exp": datetime.utcnow() + timedelta(hours=24)
        },
        current_app.config["SECRET_KEY"],
        algorithm="HS256"
    )

    return {
        "success": True,
        "message": "Login successful",
        "token": token,
        "user": {
            "id": user[0],
            "name": user[1],
            "email": user[2]
        }
    }
def login_google_user(token):
    try:
        idinfo = id_token.verify_oauth2_token(
            token,
            requests.Request(),
            "969415264956-oqhbui7i604adskpldqosjguqd40bkjc.apps.googleusercontent.com",
            clock_skew_in_seconds=10
        )

        email = idinfo["email"]
        name = idinfo["name"]

        user = get_user_by_email(email)

        if not user:
            create_user(
                name,
                email,
                ""
            )

            user = get_user_by_email(email)

        jwt_token = jwt.encode(
            {
                "user_id": user[0],
                "email": user[2],
                "exp": datetime.utcnow() + timedelta(hours=24)
            },
            current_app.config["SECRET_KEY"],
            algorithm="HS256"
        )

        return {
            "success": True,
            "token": jwt_token,
            "user": {
                "id": user[0],
                "name": user[1],
                "email": user[2]
            }
        }

    except Exception as e:
        return {
            "success": False,
            "message": str(e)
        }