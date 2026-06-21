from flask import Flask
from flask_cors import CORS
from routes.internships import internship_bp
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
CORS(app)    

app.register_blueprint(internship_bp)

@app.route("/")
def home():
    return {
        "message": "InternTracker Backend Running"
    }

if __name__ == "__main__":
    print("🚀 Backend Running on Port 5001")
    app.run(debug=True, port=5001)

