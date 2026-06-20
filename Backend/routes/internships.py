from flask import Blueprint, jsonify , request
from middleware.auth import token_required
from services.internship_service import (
    fetch_internships,
    add_saved_internship,
    fetch_saved_internships,
    remove_saved_internship,
    add_application,
    fetch_applications,
    update_application,
    register_user,
    login_user
)

internship_bp = Blueprint("internships", __name__)


@internship_bp.route("/internships", methods=["GET"])
def get_internships():
    return jsonify(fetch_internships())


@internship_bp.route("/internships/<int:id>", methods=["GET"])
def get_internship(id):
    internships = fetch_internships()

    internship = next(
        (item for item in internships if item["id"] == id),
        None
    )

    if internship:
        return jsonify(internship)

    return jsonify({"message": "Internship not found"}), 404


@internship_bp.route("/saved/<int:id>", methods=["POST"])
def save_job(id):
    return jsonify(add_saved_internship(id))


# NEW ROUTE
@internship_bp.route("/saved", methods=["GET"])
@token_required
def get_saved_jobs():
    return jsonify(fetch_saved_internships())

@internship_bp.route("/saved/<int:id>", methods=["DELETE"])
def delete_saved_job(id):
    return jsonify(remove_saved_internship(id))

@internship_bp.route("/apply/<int:id>", methods=["POST"])
def apply_job(id):
    return jsonify(add_application(id))

@internship_bp.route("/applications", methods=["GET"])
@token_required
def get_applications():
    return jsonify(fetch_applications())

@internship_bp.route("/applications/<int:id>", methods=["PUT"])
def update_application_route(id):
    data = request.get_json()

    status = data.get("status")

    return jsonify(
        update_application(id, status)
    )

@internship_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    return jsonify(
        register_user(
            name,
            email,
            password
        )
    )
@internship_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    return jsonify(
        login_user(
            email,
            password
        )
    )