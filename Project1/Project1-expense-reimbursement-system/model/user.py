class User:
    def __init__(self, username, password_1, first_name, last_name, gender, phone_number, email_address, role_1):
        self.username = username
        self.password_1 = password_1
        self.first_name = first_name
        self.last_name = last_name
        self.gender = gender
        self.phone_number = phone_number
        self.email_address = email_address
        self.role_1 = role_1

    def to_dict(self):
        return {
            "username": self.username,
            "password_1": self.password_1,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "gender": self.gender,
            "phone_number": self.phone_number,
            "email_address": self.email_address,
            "role_1": self.role_1
            }