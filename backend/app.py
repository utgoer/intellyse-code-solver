import os

from dotenv import find_dotenv
from dotenv import load_dotenv
from flask import Blueprint
from flask import Flask
from flask import jsonify
from flask import request
from flask_cors import CORS
from flask_cors import cross_origin

from utility import devResponse
from utility import implement_and_create_response_dict

load_dotenv(find_dotenv())

app = Flask(__name__)
api_bp = Blueprint("api", __name__, url_prefix="/api/")
CORS(app, resources={r"*": {"origins": "*"}})


@api_bp.route("/solve", methods=["POST"])
@cross_origin()
def solve():
    # Development response
    if os.getenv("FLASK_ENV", "production") == "development":
        return jsonify(devResponse())
    rqs = request.json
    description = rqs.get("description")
    return jsonify(implement_and_create_response_dict(description))


app.register_blueprint(api_bp)
app.config.from_object("config.settings")
