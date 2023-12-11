

import time
import spotipy
import requests
from spotipy.oauth2 import SpotifyOAuth
from flask import Flask, request, url_for, session, redirect, render_template, jsonify, make_response
from config import Spotify_config, Mongo_config, Spoonacular_config
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from flask_cors import CORS, cross_origin


# initialize Flask app and Mongo Atlas DB
app = Flask(__name__)
CORS(app)
client = MongoClient(Mongo_config.mongo_uri, server_api=ServerApi('1'))
db = client['cs411APP']
users_collection = db.users

# set the name of the session cookie
app.config['SESSION_COOKIE_NAME'] = 'Spotify Cookie'

# set a random secret key to sign the cookie
app.secret_key = Spotify_config.SECRET_KEY

# set the key for the token info in the session dictionary
TOKEN_INFO = 'token_info'

"""@app.route('/categoryInput', methods=['GET'])
def cat_input():
    return render_template('test_input.html')"""

# route to handle logging in
@app.route('/login')
def login():
    # create a SpotifyOAuth instance and get the authorization URL
    auth_url = create_spotify_oauth().get_authorize_url()
    # redirect the user to the authorization URL
    return jsonify({'auth_url': auth_url})
    #return redirect(auth_url)

# route to handle the redirect URI after authorization
@app.route('/redirect')
def redirect_page():
    # clear the session
    session.clear()
    # get the authorization code from the request parameters
    code = request.args.get('code')
    # exchange the authorization code for an access token and refresh token
    token_info = create_spotify_oauth().get_access_token(code)

    if not token_info:
        return "Unable to Get Token Info", 400
    
    spotify_api = spotipy.Spotify(auth=token_info['access_token'])
    spotify_user_data = spotify_api.current_user()

    user_information = {
        "spotify_id": spotify_user_data['id'],
        "access_token": token_info['access_token'],
        "refresh_token": token_info.get('refresh_token'),
        "token_expiry": token_info['expires_in'] + int(time.time())
    }

    users_collection.update_one(
    {"spotify_id": spotify_user_data['id']},
    {"$set": user_information},
    upsert=True
)

    # save the token info in the session
    session[TOKEN_INFO] = token_info
    return redirect('http://localhost:3000/ingredientspage')

@app.route('/getRecipes', methods =['GET'])
def search_by_ingredients():
    ingredients = request.args.get('ingredients')
    if not ingredients:
        return jsonify({'error': 'No ingredients provided'}), 400
    
    api_key = Spoonacular_config.food_api

    endpoint = f"https://api.spoonacular.com/recipes/findByIngredients?apiKey={api_key}"
    response = requests.get(endpoint, params = {
        'ingredients':ingredients,
        'number':5
    })
    if response.status_code == 200:
        # Create a response object
        flask_response = make_response(jsonify(response.json()))

        # Set CORS headers
        flask_response.headers['Access-Control-Allow-Origin'] = '*'

        return flask_response
    else:
        return jsonify({'error': 'Failed to fetch recipes'}), response.status_code


# route to get playlist based on category input
@app.route('/getPlaylists',methods=['GET'])
def cat_playlists():
    try: 
        # get the token info from the session
        token_info = get_token()
        print(token_info)
        if not token_info:
            return jsonify({'error': 'Authentication required'}), 401
        print('ERROR CHECK')
        category_id = request.args.get('category') #category is the id of the type form in HTML form
        print("Received category ID:", category_id)
        if not category_id:
            return jsonify({'error': 'Missing Category ID'}), 400
        sp = spotipy.Spotify(auth=token_info['access_token'])
        response = sp.category_playlists(category_id=str(category_id), limit = 5)['playlists']['items']
        if response is None:
            print('None Object')

        return jsonify(response)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500 
   
    


# function to get the token info from the session
def get_token():
    print('token_here')
    token_info = session.get(TOKEN_INFO, None)
    if not token_info:
        # if the token info is not found, redirect the user to the login route
        return redirect(url_for('login', _external=False))
    
    # check if the token is expired and refresh it if necessary
    now = int(time.time())

    is_expired = token_info['expires_at'] - now < 60
    if(is_expired):
        spotify_oauth = create_spotify_oauth()
        token_info = spotify_oauth.refresh_access_token(token_info['refresh_token'])

    return token_info


def create_spotify_oauth():
    client_id = Spotify_config.CLIENT_ID
    client_secret = Spotify_config.CLIENT_SECRET
    return SpotifyOAuth(
        client_id= client_id,
        client_secret=client_secret,
        redirect_uri='http://localhost:5000/redirect'
        #redirect_uri = url_for('redirect_page', _external=True),
        #scope='user-library-read playlist-modify-public playlist-modify-private'
    )

if __name__ == "__main__":
    app.run(debug=True)