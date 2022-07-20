from flask import Blueprint, request, session

from exception.login import LoginError
from exception.registration import RegistrationError
from model.user import User
from service.user_service import UserService

uc = Blueprint('employee_controller', __name__)

user_service = UserService()


@uc.route('/users')
def get_all_users():
    return {
        "users": user_service.get_all_users()
    }
@uc.route('/login', methods=['POST'])
def login():
    request_body_dict = request.get_json()

    username = request_body_dict['username']
    password = request_body_dict['password_1']

    try:
        user_dict = user_service.login(username, password)

        # We add a key to the Http session object called 'user_info' that contains the dictionary
        # with all of the user information
        # Any subsequent request that is made by the client will be identified with the appropriate Http session
        # object that contains that key
        session['user_info'] = user_dict

        return user_dict, 200
    except LoginError as e:
        return {
            "message": str(e)
        }, 400


@uc.route('/loginstatus', methods=['GET'])
def loginstatus():
    if session.get('user_info') is not None:
        return{
           "message": "You are logged in",
            "logged_in_user": session.get('user_info')
        }, 200

    else:
        return{
            "message": "You are not logged in"
        }


@uc.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return {
        "message": "Successfully logged out"
    }





@uc.route('/users', methods=['POST'])
def add_user():
    user_json_dictionary = request.get_json()
    user_object = User(user_json_dictionary['username'], user_json_dictionary['password_1'],
                       user_json_dictionary['first_name'], user_json_dictionary['last_name'],
                       user_json_dictionary['gender'], user_json_dictionary['phone_number'],
                       user_json_dictionary['email_address'], user_json_dictionary['role_1'])
    try:
        added_user = user_service.add_user(user_object)
    except RegistrationError as e:
        return{
            "messages": e.messages
        }, 400

    return added_user, 201

