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

    SKILLS = {
        "Python": ["python"],
        "Java": ["java"],
        "C++": ["c++"],
        "C": ["c"],
        "JavaScript": ["javascript", "js"],
        "TypeScript": ["typescript", "ts"],
        "React": ["react"],
        "Node.js": ["nodejs", "node.js", "node js"],
        "SQL": ["sql"],
        "PostgreSQL": ["postgresql", "postgres"],
        "MongoDB": ["mongodb", "mongo"],
        "AWS": ["aws", "amazon web services"],
        "Azure": ["azure"],
        "Docker": ["docker"],
        "Kubernetes": ["kubernetes", "k8s"],
        "Git": ["git"],
        "TensorFlow": ["tensorflow"],
        "PyTorch": ["pytorch"],
        "Machine Learning": [
            "machine learning",
            "ml"
        ]
    }

    text = description.lower()

    found = []

    for skill, aliases in SKILLS.items():

        for alias in aliases:

            if re.search(
                rf"\b{re.escape(alias)}\b",
                text
            ):
                found.append(skill)
                break

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

def detect_batch(description):

    text = description.lower()

    patterns = [
        r'20\d{2}\s*batch',
        r'20\d{2}\s*graduates?',
        r'graduating\s*in\s*20\d{2}'
    ]

    for pattern in patterns:

        match = re.search(pattern, text)

        if match:
            return match.group()

    if "final year" in text:
        return "Final Year"

    if "pre-final" in text:
        return "Pre-final Year"

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
            detect_duration(description),
        "batch":
            detect_batch(description),    
    }