import re
from dao.reimbursement_dao import ReimbursementDao
from dao.user_dao import UserDao
from exception.login import LoginError
from exception.registration import RegistrationError
from exception.user_not_found import UserNotFoundError

class ReimbursementService:

    def __init__(self):
        self.reimbursement_dao = ReimbursementDao()

    # Create a new account for a customer with id x
    # def create_reimbursement(self, user_id, reimbursement_object):
    #
    #     if self.reimbursement_dao.get_user_by_user_id(user_id, reimbursement_object) is None:
    #         raise UserNotFoundError(f"Customer with id {reimbursement_object.user_id} was not found")
    #     # if reimbursement_object < 0:
    #     #     raise NegativeAccountBalanceError("Account balance cannot be less than 0")
    #
    #     created_reimbursement_object = self.reimbursement_dao.create_reimbursement(user_id, reimbursement_object)
    #     return created_reimbursement_object.to_dict()

    def create_reimbursement(self, username, reimbursement_object):

        if self.reimbursement_dao.get_user_by_username(username) is None:
            raise UserNotFoundError(f"User with username {username} was not found")
        # if reimbursement_object < 0:
        #     raise NegativeAccountBalanceError("Account balance cannot be less than 0")

        created_reimbursement_object = self.reimbursement_dao.create_reimbursement(username, reimbursement_object)
        return created_reimbursement_object.to_dict()

    # Get all reimbursements for a single user
    def get_all_reimbursements_by_username(self, username):
        # CHeck if user actually exists
        if self.reimbursement_dao.get_user_by_username(username) is None:
            raise UserNotFoundError(f"User with username {username} was not found")

        return list(map(lambda b: b.to_dict(), self.reimbursement_dao.get_all_reimbursements_by_username(username)))  # list

    # Return list of reimbursement dictionaries
    def get_reimbursements(self, filter_status):
        list_of_reimbursement_objects = self.reimbursement_dao.get_reimbursements(filter_status)

        list_of_reimbursement_dictionaries = []
        for reimbursement_obj in list_of_reimbursement_objects:
            list_of_reimbursement_dictionaries.append(reimbursement_obj.to_dict())

        return list_of_reimbursement_dictionaries

    def get_filter_reimbursement_status(self, filter_status):
        list_of_reimbursement_objects = self.reimbursement_dao.get_filter_reimbursement_status(filter_status)

        list_of_reimbursement_dictionaries = []
        for reimbursement_obj in list_of_reimbursement_objects:
            list_of_reimbursement_dictionaries.append(reimbursement_obj.to_dict())

        return list_of_reimbursement_dictionaries

    def update_reimbursement(self, username, reimb_id, update_reimbursement_object):
        update_reimb_object = self.reimbursement_dao.update_reimbursement(username, reimb_id, update_reimbursement_object)

        if update_reimb_object is None:
            raise UserNotFoundError(f"User with reimb-id {reimb_id} was not found")

        return update_reimb_object.to_dict()  # dictionary