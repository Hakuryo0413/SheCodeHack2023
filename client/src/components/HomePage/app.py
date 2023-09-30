# get data api
import flask
from flask import request, jsonify
from flask_cors import CORS
# import modules from other link files
from features.axios.api.user.apply_for_job import isApplied
from ../shimmer/UserSideJobListingShimmer import UserSideJobListingShimmer 


# create flask app
app = flask.Flask(__name__)
# app route
@app.route('/', methods=['GET'])
def home():
    return "<h1>Home Page</h1>"
# app route
@app.route('/api', methods=['GET'])
def api():
    return jsonify({'message': 'Hello World'})
