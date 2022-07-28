import psycopg
from dotenv import dotenv_values
from model.reimbursement import Reimbursement
from model.user import User
from datetime import datetime, timezone

config = dotenv_values(".env") # is a dict

dt = datetime.now(timezone.utc)

class ReimbursementDao:

    def get_user_by_username(self, username):
        with psycopg.connect(host=config['host'], port=config['port'], dbname=config['dbname'], user=config['user'],
                       password=config['password']) as conn:
            with conn.cursor() as cur:
                cur.execute("select * from ers_users where username = %s", (username, ))
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

    # def create_reimbursement(self, user_id, reimbursement_object):
    #     with psycopg.connect(host=config['host'], port=config['port'], dbname=config['dbname'], user=config['user'],
    #                    password=config['password']) as conn:
    #         with conn.cursor() as cur:
    #             cur.execute("insert into ers_reimbursements (reimb_author, reimbursement_amount, submitted, status, reimb_type, description) values (%s, %s, %s, %s, %s, %s) RETURNING *",
    #                 (user_id, reimbursement_object.reimbursement_amount, dt, reimbursement_object.status, reimbursement_object.reimb_type, reimbursement_object.description))  # Tuple
    #
    #             inserted_reimbursement_row = cur.fetchone()
    #
    #             conn.commit()  # commit the transaction in any DML operation
    #
    #             return Reimbursement(inserted_reimbursement_row[0], inserted_reimbursement_row[1],
    #                     inserted_reimbursement_row[2], inserted_reimbursement_row[3],
    #                     inserted_reimbursement_row[4],inserted_reimbursement_row[5],
    #                     inserted_reimbursement_row[6], inserted_reimbursement_row[7],
    #                     inserted_reimbursement_row[8], inserted_reimbursement_row[9]
    #                 )

    def create_reimbursement(self, username, reimbursement_object):
        with psycopg.connect(host=config['host'], port=config['port'], dbname=config['dbname'], user=config['user'],
                       password=config['password']) as conn:
            with conn.cursor() as cur:
                cur.execute("insert into ers_reimbursements (reimb_author, reimbursement_amount, reimb_type, description) values (%s, %s, %s, %s) RETURNING *",
                    (username, reimbursement_object.reimbursement_amount, reimbursement_object.reimb_type, reimbursement_object.description))  # Tuple

                inserted_reimbursement_row = cur.fetchone()

                conn.commit()  # commit the transaction in any DML operation

                return Reimbursement(inserted_reimbursement_row[0], inserted_reimbursement_row[1],
                        inserted_reimbursement_row[2], inserted_reimbursement_row[3],
                        inserted_reimbursement_row[4],inserted_reimbursement_row[5],
                        inserted_reimbursement_row[6], inserted_reimbursement_row[7],
                        inserted_reimbursement_row[8], inserted_reimbursement_row[9]
                    )



    # Get all reimbursements for a single user
    def get_all_reimbursements_by_username(self, username, user_filter_status):
        # Step 1: open a connection object
        with psycopg.connect(
                host=config['host'],
                port=config['port'],
                dbname=config['dbname'],
                user=config['user'],
                password=config['password']
        ) as conn:
            # Automatically close the cursor
            with conn.cursor() as cur:
                if user_filter_status == 'pending':
                    cur.execute("SELECT * FROM ers_reimbursements WHERE status = %s AND reimb_author = %s ORDER BY reimb_id ASC", (user_filter_status, username))
                elif user_filter_status == 'approved':
                    cur.execute("SELECT * FROM ers_reimbursements WHERE status = %s AND reimb_author = %s ORDER BY reimb_id ASC", (user_filter_status, username))
                elif user_filter_status == 'denied':
                    cur.execute("SELECT * FROM ers_reimbursements WHERE status = %s AND reimb_author = %s ORDER BY reimb_id ASC", (user_filter_status, username))
                else:
                    cur.execute("SELECT * FROM ers_reimbursements WHERE reimb_author = %s ORDER BY reimb_id ASC", (username,))

                reimb_list = []

                for row in cur:
                    reimb_list.append(Reimbursement(row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9]))

                return reimb_list


    # Gets all reimbursement
    def get_reimbursements(self, filter_status):
        # Step 1: open a connection object
        with psycopg.connect(
                host=config['host'],
                port=config['port'],
                dbname=config['dbname'],
                user=config['user'],
                password=config['password']
        ) as conn:
            # Automatically close the cursor
            with conn.cursor() as cur:
                if filter_status == 'pending':
                    cur.execute("SELECT * FROM ers_reimbursements WHERE status = %s ORDER BY reimb_id ASC", (filter_status, ))
                elif filter_status == 'approved':
                    cur.execute("SELECT * FROM ers_reimbursements WHERE status = %s ORDER BY reimb_id ASC", (filter_status, ))
                elif filter_status == 'denied':
                    cur.execute("SELECT * FROM ers_reimbursements WHERE status = %s ORDER BY reimb_id ASC", (filter_status, ))
                else:
                    cur.execute("SELECT * FROM ers_reimbursements ORDER BY reimb_id ASC")

                my_list_of_reimbursement_objs = []
                # iterate over each row of the "users" table
                for reimbursement in cur:
                    reimb_id = reimbursement[0]
                    reimb_author = reimbursement[1]
                    reimb_resolver = reimbursement[2]
                    reimbursement_amount = reimbursement[3]
                    submitted = reimbursement[4]
                    resolved = reimbursement[5]
                    status = reimbursement[6]
                    reimb_type = reimbursement[7]
                    description = reimbursement[8]
                    receipt = reimbursement[9]

                    my_reimbursement_obj = Reimbursement(reimb_id, reimb_author, reimb_resolver, reimbursement_amount,
                                                         submitted, resolved, status, reimb_type, description, receipt)
                    my_list_of_reimbursement_objs.append(my_reimbursement_obj)

                return my_list_of_reimbursement_objs

    def get_filter_reimbursement_status(self, filter_status):
        with psycopg.connect(
                host=config['host'],
                port=config['port'],
                dbname=config['dbname'],
                user=config['user'],
                password=config['password']
        ) as conn:
            # Automatically close the cursor
            with conn.cursor() as cur:
                if filter_status == 'pending':
                    cur.execute("SELECT * FROM ers_reimbursements WHERE status = %s ORDER BY reimb_id ASC", (filter_status, ))
                elif filter_status == 'approved':
                    cur.execute("SELECT * FROM ers_reimbursements WHERE status = %s ORDER BY reimb_id ASC", (filter_status, ))
                elif filter_status == 'denied':
                    cur.execute("SELECT * FROM ers_reimbursements WHERE status = %s ORDER BY reimb_id ASC", (filter_status, ))
                else:
                    cur.execute("SELECT * FROM ers_reimbursements WHERE status = %s ORDER BY reimb_id ASC")

                my_list_of_reimbursement_objs = []
                # iterate over each row of the "users" table
                for reimbursement in cur:
                    reimb_id = reimbursement[0]
                    reimb_author = reimbursement[1]
                    reimb_resolver = reimbursement[2]
                    reimbursement_amount = reimbursement[3]
                    submitted = reimbursement[4]
                    resolved = reimbursement[5]
                    status = reimbursement[6]
                    reimb_type = reimbursement[7]
                    description = reimbursement[8]
                    receipt = reimbursement[9]

                    my_reimbursement_obj = Reimbursement(reimb_id, reimb_author, reimb_resolver, reimbursement_amount,
                                                         submitted, resolved, status, reimb_type, description, receipt)
                    my_list_of_reimbursement_objs.append(my_reimbursement_obj)

                return my_list_of_reimbursement_objs

    def update_reimbursement(self, username, reimb_id, update_reimbursement_object):
        with psycopg.connect(
                host=config['host'],
                port=config['port'],
                dbname=config['dbname'],
                user=config['user'],
                password=config['password']
        ) as conn:
            # Automatically close the cursor
            with conn.cursor() as cur:
                cur.execute(
                    "UPDATE ers_reimbursements SET status = %s, resolved = %s, reimb_resolver = %s WHERE reimb_id = %s RETURNING *",
                    (update_reimbursement_object.status, dt, username, reimb_id))

                conn.commit()

                updated_reimb_row = cur.fetchone()

                if updated_reimb_row is None:
                    return None

                return Reimbursement(updated_reimb_row[0], updated_reimb_row[1],
                        updated_reimb_row[2], updated_reimb_row[3],
                        updated_reimb_row[4],updated_reimb_row[5],
                        updated_reimb_row[6], updated_reimb_row[7],
                        updated_reimb_row[8], updated_reimb_row[9]
                    )