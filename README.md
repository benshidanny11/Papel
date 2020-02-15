# Papel
[Open app here](https://benshidanny11.github.io/Papel/UI)
Papel is a light-weight core banking application that powers banking operations like account creation, customer deposits, and withdrawals. This app is meant to support a single bank, where users can signup and create bank accounts online, but must visit the branch to withdraw or deposit money.

# Features
* Signup (Any user)
* User Login(Any user)
* User Reset password(Any user)
* View all accounts(Admin)
* Remove bank account(Admin)
* View all users(Admin)
* Add cashier or admin(Admin)
* Add activiate or deactivate user account(Admin)
* Create banck account(Client)
* View transaction history(CLient)
* Credit or debit a client(Admin)


## EndPoints
* Access end points [Here](https://papel-andela-1.herokuapp.com/)

Below are the colletion of routes.

### For user 

| Endpoint                   | Methods   | Functionalities        |
| ---------------------------|-----------|------------------------|
|/api/auth/signup            | POST      | Signup                 |
|/api/auth/login             | POST      | Login                  |
|/api/users/verify/:mail     | PATCH     | Verify a client        |
|/api/users/reset/:mail      | POST      | Reset pasword          |
|/api/users                  | GET       | Get all users          |
|/api/accounts               | GET       | Get all accounts       |

### For transaction

| Endpoint                     | Methods   | Functionalities                  |
| -----------------------------|-----------|--------------------------------  |
|/api/trans/depit/:accno       | POST      | Apply for loan                   | 
|/api/trans/credit/:accno      | POST      | Approve or reject loan           |
|/api/trans/history:email      | GET       | View all repaid loans            |


## Installation
* clone this Repo https://github.com/benshidanny11/Papel.git
* Run `cd Papel` to navigation to project directory 
* install the dependencies by npm i command
* And then Test with Postman

## Technologies Used
* HTML5
* CSS3
* node js 10.15.1
* Express 4.17.1
* pg for local db 7.11.0


Copyright(c) 2020 Urimubenshi Daniel

