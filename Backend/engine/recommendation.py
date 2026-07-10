def calculate_match(user, internship):

    score = 0

    # Skills (50%)

    matched_skills = len(
        set(user["skills"]) &
        set(internship["skills"])
    )

    total_skills = max(
        len(internship["skills"]),
        1
    )

    skill_score = (
        matched_skills /
        total_skills
    ) * 50

    score += skill_score

    # Category (30%)

    if (
        user["interest"] ==
        internship["category"]
    ):
        score += 30

    # Location (20%)

    if (
        internship["location"]
        in user["locations"]
    ):
        score += 20


    return round(score, 2)

def recommend_jobs(user, internships):

    recommendations = []

    for internship in internships:

        score = calculate_match(
            user,
            internship
        )

        internship["match_score"] = score

        recommendations.append(
            internship
        )

    recommendations.sort(
        key=lambda x: x["match_score"],
        reverse=True
    )

    return recommendations
