from datetime import datetime


def log_info(message):
    print(
        f"[{datetime.now().strftime('%H:%M:%S')}] [INFO] {message}"
    )


def log_success(message):
    print(
        f"[{datetime.now().strftime('%H:%M:%S')}] [SUCCESS] {message}"
    )


def log_warning(message):
    print(
        f"[{datetime.now().strftime('%H:%M:%S')}] [WARNING] {message}"
    )


def log_error(message):
    print(
        f"[{datetime.now().strftime('%H:%M:%S')}] [ERROR] {message}"
    )