CATEGORY_KEYWORDS = {

    "Software Engineering": [
        "software",
        "backend",
        "frontend",
        "full stack",
        "developer",
        "engineer"
    ],

    "AI / ML": [
        "machine learning",
        "artificial intelligence",
        "deep learning",
        "ai",
        "ml",
        "llm"
    ],

    "Data Science": [
        "data science",
        "data analyst",
        "analytics",
        "python",
        "sql"
    ],

    "Cybersecurity": [
        "security",
        "cyber",
        "penetration",
        "soc"
    ],

    "Cloud": [
        "cloud",
        "aws",
        "azure",
        "gcp",
        "devops"
    ],

    "Embedded Systems": [
        "embedded",
        "firmware",
        "microcontroller",
        "hardware",
        "electronics",
        "fpga",
        "verilog"
    ]
}


def classify(job):

    text = (
        job["role"] +
        " " +
        job["description"]
    ).lower()

    for category, keywords in CATEGORY_KEYWORDS.items():

        for keyword in keywords:

            if keyword in text:
                return category

    return "Other"