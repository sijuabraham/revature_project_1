class User:
    def __init__(self, user_id, username, password, first_name, last_name, user_role, email):
        self.user_id = user_id
        self.username = username
        self.password = password
        self.first_name = first_name
        self.last_name = last_name
        self.user_role = user_role
        self.email = email

    def to_dict(self):
        return {
            "user_id" : self.user_id,
            "username": self.username,
            "password": self.password,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "user_role": self.user_role,
            "email": self.email
        }