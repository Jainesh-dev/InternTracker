import bcrypt
import jwt
from google.oauth2 import id_token
from google.auth.transport import requests
from datetime import datetime, timedelta
from database.db import (
    save_user_profile,
    complete_onboarding
)
import os
from flask import current_app
from database.db import (
    get_all_internships,
    save_internship,
    get_saved_internships,
    delete_saved_internship,
    apply_to_internship,
    get_all_applications,
    update_application_status,
    create_User,
    create_google_User,
    get_User_by_email,
    complete_onboarding
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

def register_User(name, email, password):
    return create_User(
        name,
        email,
        password
    )
def login_User(email, password):
    User = get_User_by_email(email)

    if not User:
        return {
            "success": False,
            "message": "User not found"
        }
    
    if User[3] is None:
        return {
        "success": False,
        "message": "Please login with Google"
    }

    if not bcrypt.checkpw(
        password.encode("utf-8"),
        User[3].encode("utf-8")
    ):
        return {
            "success": False,
            "message": "Invalid password"
        }

    token = jwt.encode(
        {
            "User_id": User[0],
            "email": User[2],
            "exp": datetime.utcnow() + timedelta(hours=24)
        },
        current_app.config["SECRET_KEY"],
        algorithm="HS256"
    )

    return {
        "success": True,
        "message": "Login successful",
        "token": token,
        "User": {
            "id": User[0],
            "name": User[1],
            "email": User[2]
        }
    }
def login_google_User(token):
    try:
        idinfo = id_token.verify_oauth2_token(
            token,
            requests.Request(),
            os.getenv("GOOGLE_CLIENT_ID"),
            clock_skew_in_seconds=10
        )

        email = idinfo["email"]
        name = idinfo["name"]

        User = get_User_by_email(email)
        is_new_User=False

        if not User:
            is_new_User=True
            create_User(
                name,
                email,
            )
            User = get_User_by_email(email)
        jwt_token = jwt.encode(
            {
                "User_id": User[0],
                "email": User[2],
                "exp": datetime.utcnow() + timedelta(hours=24)
            },
            current_app.config["SECRET_KEY"],
            algorithm="HS256"
        )

        return {
            "success": True,
            "is_new_User":is_new_User,
            "onboarding_completed":User[4],
            "token": jwt_token,
            "User": {
                "id": User[0],
                "name": User[1],
                "email": User[2]
            }
        }

    except Exception as e:
        return {
            "success": False,
            "message": str(e)
        }

def finish_onboarding(data):

    print("=" * 50)
    print("ONBOARDING DATA RECEIVED")
    print(data)
    print("=" * 50)

    save_user_profile(
        data["user_id"],
        data["college"],
        data["branch"],
        data["degree"],
        data["graduation_year"],
        data["skills"],
        data["interests"],
        data["preferred_locations"]
    )

    complete_onboarding(data["user_id"])

    return {
        "success": True,
        "message": "Onboarding completed successfully"
    }