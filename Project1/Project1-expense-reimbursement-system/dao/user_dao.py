from dotenv import dotenv_values

from model.user import User
import psycopg

config = dotenv_values(".env") # is a dict

class UserDao:

    # for login logout and loginstatus endpoints
    def get_user_by_username_and_password(self, username, password):
        with psycopg.connect(host=config['host'], port=config['port'], dbname=config['dbname'], user=config['user'],
                       password=config['password']) as conn:
            with conn.cursor() as cur:
                cur.execute("select * from ers_users where username = %s and password = %s", (username, password))
                user_info = cur.fetchone()

                if user_info is None:
                    return None

                user_id = user_info[0]
                username = user_info[1]
                password = user_info[2]
                first_name = user_info[3]
                last_name = user_info[4]
                user_role = user_info[5]
                email = user_info[6]

                return User(user_id, username, password, first_name, last_name, user_role, email)
