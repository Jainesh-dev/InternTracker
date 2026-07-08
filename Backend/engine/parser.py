import re


def detect_work_type(description):

    text = description.lower()

    if "remote" in text:
        return "Remote"

    if "hybrid" in text:
        return "Hybrid"

    if (
        "onsite" in text
        or "on-site" in text
        or "on site" in text
    ):
        return "Onsite"

    return "Unknown"


def detect_skills(description):

    skills_database = [
        "Python",
        "Java",
        "C++",
        "C",
        "JavaScript",
        "TypeScript",
        "React",
        "Node.js",
        "NodeJS",
        "SQL",
        "PostgreSQL",
        "MongoDB",
        "AWS",
        "Azure",
        "Docker",
        "Kubernetes",
        "Git",
        "TensorFlow",
        "PyTorch",
        "Machine Learning"
    ]

    found = []

    text = description.lower()

    for skill in skills_database:

        if skill.lower() in text:
            found.append(skill)

    return found


def detect_experience(description):

    import re

    text = description.lower()

    if "fresher" in text:
        return "Fresher"

    if "no experience" in text:
        return "No Experience"

    if "entry level" in text:
        return "Entry Level"

    match = re.search(
        r'(\d+)\+?\s*(?:year|years)',
        text
    )

    if match:
        return match.group()

    return "Not Specified"

def detect_degree(description):

    text = description.lower()

    if "bachelor" in text:
        return "Bachelor"

    if "master" in text:
        return "Master"

    if "phd" in text:
        return "PhD"

    if "undergraduate" in text:
        return "Undergraduate"

    if "graduate" in text:
        return "Graduate"

    return "Not Specified"


def detect_salary(description):

    patterns = [
        r'₹\s?\d[\d,]*(?:\.\d+)?\s*(?:/month|per month|/year|LPA)?',
        r'\$\s?\d[\d,]*(?:\.\d+)?\s*(?:/hour|/month|/year)?',
        r'€\s?\d[\d,]*(?:\.\d+)?\s*(?:/month|/year)?'
    ]

    for pattern in patterns:
        match = re.search(pattern, description, re.IGNORECASE)
        if match:
            return match.group()

    return "Not Available"


def detect_duration(description):

    text = description.lower()

    patterns = [
        r'\d+\s*(?:month|months)',
        r'\d+\s*(?:week|weeks)',
        r'\d+\s*(?:day|days)'
    ]

    for pattern in patterns:

        match = re.search(pattern, text)

        if match:
            return match.group()

    return "Not Specified"


def parse_description(description):

    return {

        "work_type":
            detect_work_type(description),

        "skills":
            detect_skills(description),

        "experience":
            detect_experience(description),

        "degree":
            detect_degree(description),

        "salary":
            detect_salary(description),

        "duration":
            detect_duration(description)
    }