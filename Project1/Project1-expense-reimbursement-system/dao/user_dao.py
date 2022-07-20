
from model.user import User
import psycopg

class UserDao:

    def get_user_by_username_and_password(self, username, password):
        with psycopg.connect(host="127.0.0.1", port="5432", dbname="postgres", user="postgres", password="postgres123") as conn:
            with conn.cursor() as cur:
                cur.execute("select * from user1 where username = %s and password_1 = %s", (username, password))
                user_info = cur.fetchone()

                if user_info is None:
                    return None


                username = user_info[0]
                password_1 = user_info[1]
                first_name = user_info[2]
                last_name = user_info[3]
                gender = user_info[4]
                phone_number = user_info[5]
                email_address = user_info[6]
                role_1 = user_info[7]
                return User(username, password_1, first_name, last_name, gender, phone_number, email_address, role_1)

    def get_all_users(self):
        with psycopg.connect(host="127.0.0.1", port="5432", dbname="postgres", user="postgres", password="postgres123") as conn:
            with conn.cursor() as cur:
                cur.execute("select * from user1")

                my_list_of_users_objs = []

                for user in cur:
                    user_username = user[0]
                    user_password = user[1]
                    user_firstname = user[2]
                    user_last_name = user[3]
                    user_gender = user[4]
                    user_phonenumber = user[5]
                    user_email = user[6]
                    user_role = user[7]

                    my_user_obj = User(user_username, user_password, user_firstname, user_last_name,
                                       user_gender, user_phonenumber, user_email, user_role)
                    my_list_of_users_objs.append(my_user_obj)

                return my_list_of_users_objs


    def add_user(self, user_object):
        user_username_to_add = user_object.username
        user_password_1_to_add = user_object.password_1
        user_first_name_to_add = user_object.first_name
        user_last_name_to_add = user_object.last_name
        user_gender_to_add = user_object.gender
        user_phone_number_to_add = user_object.phone_number
        user_email_to_add = user_object.email_address
        user_role_1_to_add = user_object.role_1
        with psycopg.connect(host="127.0.0.1", port="5432", dbname="postgres", user="postgres", password="postgres123") as conn:
            with conn.cursor() as cur:
                cur.execute("insert into user1(username, password_1, first_name, last_name, gender, phone_number, email_address, role_1) values(%s, %s, %s, %s, %s, %s, %s, %s)returning *", (user_username_to_add, user_password_1_to_add, user_first_name_to_add, user_last_name_to_add, user_gender_to_add, user_phone_number_to_add, user_email_to_add, user_role_1_to_add))

                user_row_that_was_just_inserted = cur.fetchone()
                conn.commit()
            return User(user_row_that_was_just_inserted[0], user_row_that_was_just_inserted[1],
                        user_row_that_was_just_inserted[2], user_row_that_was_just_inserted[3],
                        user_row_that_was_just_inserted[4], user_row_that_was_just_inserted[5],
                        user_row_that_was_just_inserted[6], user_row_that_was_just_inserted[7])

    def get_user_by_username(self, username):
        with psycopg.connect(host="127.0.0.1", port="5432", dbname="postgres", user="postgres", password="postgres123") as conn:
            with conn.cursor() as cur:
                cur.execute("select * from user1 where username = %s", (username, ))
                user_info = cur.fetchone()

                if user_info is None:
                    return None

                username = user_info[0]
                password_1 = user_info[1]
                first_name = user_info[2]
                last_name = user_info[3]
                gender = user_info[4]
                phone_number = user_info[5]
                email_address = user_info[6]
                role_1 = user_info[7]
                return User(username, password_1, first_name, last_name, gender, phone_number, email_address, role_1)

    def get_user_by_email(self, email):
        with psycopg.connect(host="127.0.0.1", port="5432", dbname="postgres", user="postgres", password="postgres123") as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT * from user1 WHERE email_address = %s", (email,))
                user_info = cur.fetchone()

                if user_info is None:
                    return None

                username = user_info[0]
                password_1 = user_info[1]
                first_name = user_info[2]
                last_name = user_info[3]
                gender = user_info[4]
                phone_number = user_info[5]
                email_address = user_info[6]
                role_1 = user_info[7]
                return User(username, password_1, first_name, last_name, gender, phone_number,email_address, role_1)