--Drop tables if exists
DROP TABLE IF EXISTS ers_reimbursements;
DROP TABLE IF EXISTS ers_users;

--ers_users table
CREATE TABLE ers_users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL,
    first_name VARCHAR(30) UNIQUE NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    user_role VARCHAR(15) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL CHECK (email ~* '^[A-Za-z0-9.+%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'));

INSERT INTO ers_users (username, password, first_name, last_name, user_role, email)
VALUES 
('Shushmita97', 'passWRD234', 'Shushmita','Das', 'finance_manager', 'shushmita99@github.com'),
('Siju78', 'passWRD234', 'Siju', 'Abraham', 'finance_manager', 'siju789@fibonacci.com'),
('Carol88', 'passWRD234', 'Carol', 'Danvers', 'employee', 'abc578f@randommail.com'),
('John11', 'passWRD234', 'John', 'Doe', 'employee', 'abcdefgh@revature.com'),
('MiraJ007', 'passWRD234', 'Mira', 'Jane', 'employee', 'abcdefghi@disneywrld.com'),
('Ben22', 'passWRD234', 'Ben', 'Doe', 'employee', 'abcdefghj@disneywrld.com');

--ers_reimbursements table
CREATE TABLE ers_reimbursements (
    reimb_id SERIAL PRIMARY KEY,
    reimb_author VARCHAR(20) NOT NULL,
    reimb_resolver VARCHAR(20),
    reimbursement_amount NUMERIC NOT NULL,
    submitted TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved TIMESTAMP,
    status VARCHAR(10) CHECK (status in ('pending', 'approved', 'denied')) DEFAULT 'pending',
    reimb_type VARCHAR(20) NOT NULL CHECK (reimb_type in ('Lodging','Travel', 'Food', 'Other')),
    description VARCHAR(100) NOT NULL,
    receipt BYTEA,
    CONSTRAINT fk_ers_users FOREIGN KEY (reimb_author) REFERENCES ers_users(username),
    CONSTRAINT fk_ers_users_reimb FOREIGN KEY (reimb_resolver) REFERENCES ers_users(username)
);

insert into ers_reimbursements (reimb_author, reimbursement_amount, reimb_type, description) 
values('Carol88', 3444, 'Travel', 'This is travelling');
insert into ers_reimbursements (reimb_author, reimbursement_amount, reimb_type, description) 
values('John11', 1678, 'Lodging', 'This is lodging');
insert into ers_reimbursements (reimb_author, reimbursement_amount, reimb_type, description) 
values('Carol88', 200, 'Food', 'This is foodie');
insert into ers_reimbursements (reimb_author, reimbursement_amount, reimb_type, description) 
values('MiraJ007', 500, 'Food', 'Went with classic calamari');
insert into ers_reimbursements (reimb_author, reimbursement_amount, reimb_type, description) 
values('Ben22', 1200, 'Lodging', 'This is loging for Ben');
insert into ers_reimbursements (reimb_author, reimbursement_amount, reimb_type, description) 
values('Ben22', 1200, 'Lodging', 'Had to move due to placement');
insert into ers_reimbursements (reimb_author, reimbursement_amount, reimb_type, description) 
values('Carol88', 200, 'Lodging', 'Temporarily staying in Houston for renovations');

-- SQL Queries
UPDATE ers_reimbursements
SET status = 'approved', resolved = current_timestamp, reimb_resolver = 'Siju78'
WHERE reimb_id = '4'

SELECT * FROM ers_users;
SELECT * FROM ers_reimbursements;

SELECT * FROM ers_reimbursements
WHERE reimb_author = 'Carol88';

SELECT * FROM ers_reimbursements WHERE reimb_author = 'Shushmita97' ORDER BY reimb_id ASC;

-- Comprehensive Select Query
SELECT ers_users.username, ers_users.first_name, ers_users.last_name, ers_reimbursements.reimb_author, 
ers_reimbursements.reimb_resolver, ers_reimbursements.reimbursement_amount, ers_reimbursements.submitted, 
ers_reimbursements.resolved, ers_reimbursements.status, ers_reimbursements.reimb_type, 
ers_reimbursements.description, ers_reimbursements.receipt
FROM ers_users
LEFT JOIN ers_reimbursements ON ers_users.username = ers_reimbursements.reimb_author
GROUP BY ers_users.username
ORDER BY ers_reimbursements.reimb_id ASC;


