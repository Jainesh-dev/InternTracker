import re

SKILL_DATABASE = [
    "Python",
    "Java",
    "C++",
    "C",
    "JavaScript",
    "TypeScript",
    "React",
    "Angular",
    "Vue",
    "Node.js",
    "Express",
    "Django",
    "Flask",
    "FastAPI",
    "SQL",
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "Redis",
    "Docker",
    "Kubernetes",
    "AWS",
    "Azure",
    "GCP",
    "Git",
    "Linux",
    "TensorFlow",
    "PyTorch",
    "Machine Learning",
    "Deep Learning",
    "Pandas",
    "NumPy",
    "Scikit-learn",
    "REST API",
    "GraphQL",
    "HTML",
    "CSS",
    "Arduino",
    "Verilog",
    "VHDL"
]


def extract_skills(text):

    if not text:
        return []

    text = text.lower()

    found = []

    for skill in SKILL_DATABASE:

        if re.search(
            r"\b" + re.escape(skill.lower()) + r"\b",
            text
        ):
            found.append(skill)

    return found