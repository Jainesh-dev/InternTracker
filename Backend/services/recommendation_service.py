from database.db import (
    get_all_internships,
    get_user_profile
)

from engine.recommendation import (
    recommend_jobs
)


def fetch_recommendations(user_id):

    user = get_user_profile(user_id)

    internships = get_all_internships()

    return recommend_jobs(
        user,
        internships
    )