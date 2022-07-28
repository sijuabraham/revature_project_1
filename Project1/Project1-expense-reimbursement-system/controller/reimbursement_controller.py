from flask import Blueprint, request, session
from exception.user_not_found import UserNotFoundError
from service.user_service import UserService
from service.reimbursement_service import ReimbursementService
from model.reimbursement import Reimbursement
rc = Blueprint('reimbursement_controller', __name__)

reimbursement_service = ReimbursementService()

@rc.route('/users/<username>/reimbursements', methods=['POST'])
def create_reimbursement(username):
    reimbursement_json_dictionary = request.get_json()
    # print(reimbursement_json_dictionary)
    reimbursement_object = Reimbursement(
        None,  # reimb_id
        username,  # reimb_author
        None,  # reimb_resolver
        reimbursement_json_dictionary['reimbursement_amount'],
        None,  # submitted timestamp
        None,  # resolved timestamp
        None,  # status
        reimbursement_json_dictionary['reimb_type'],
        reimbursement_json_dictionary['description'],
        None  # reimbursement_json_dictionary['receipt']
    )  # constructor for Reimbursement object
    try:
        # Dictionary representation of the newly added user
        return reimbursement_service.create_reimbursement(username, reimbursement_object), 201  # 201 created
    except UserNotFoundError as e:
        return {
                   "message": str(e)
               }, 404

# Get all reimbursements for a single user
@rc.route('/users/<username>/reimbursements')
def get_all_reimbursements_by_username(username):
    user_filter_status = request.args.get("status")
    try:
        return {
            "reimbursements": reimbursement_service.get_all_reimbursements_by_username(username, user_filter_status)
        }
    except UserNotFoundError as e:
        return {
                   "message": str(e)
               }, 404


# GET all user-reimb details
@rc.route('/reimbursements')
def get_reimbursements():
    filter_status = request.args.get("status")
    print(filter_status)
    return {
        "reimbursements": reimbursement_service.get_reimbursements(filter_status)
    }
# element in page where you can choose options (radio/dropdown)
# as populating data, we change the innerHTML to (code for group radio buttons) select the value
# cell status = change + reimb_id
# the element has value attribute
# Where you call the function

@rc.route('/users/<username>/reimbursements/<reimb_id>', methods=['PUT'])
def update_reimbursement_by_reimb_id(username, reimb_id):
    update_reimb_json_dictionary = request.get_json()
    print(update_reimb_json_dictionary)
    update_reimbursement_object = Reimbursement(
        reimb_id,
        None,  # reimb_author
        username,  # reimb_resolver
        None,  # amount
        None,  # submitted timestamp
        None,  # resolved timestamp
        update_reimb_json_dictionary['status'],  # status
        None,  # reimb_type
        None,  # description,
        None  # reimbursement_json_dictionary['receipt']
    )  # constructor for Reimbursement object
    try:
        # Dictionary representation of the newly added user
        return reimbursement_service.update_reimbursement(username, reimb_id, update_reimbursement_object), 200  # 201 created
    except UserNotFoundError as e:
        return {
                   "message": str(e)
               }, 404

    # Service layer:
    # Check the user role trying to change the status
    # Raise specific exception: 403 (Forbidden)
    # if reimb exists and user exists: 404 (not found)
    # reimbursement already resolved/denied/not? : 403 (forbidden)
    # Invalid parameter for approved/denied encodeing number: 403 (forbidden)
