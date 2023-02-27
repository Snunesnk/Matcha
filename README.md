# MATCHA

## Usefull env-dev commands:


### Start all (or one specific) dockers in detached mode

/[...]/Matcha/env: ./start [matcha_\*]  

### Rebuild all (or one specific) then restart them. (Does not redownload docker images)

/[...]/Matcha/env: ./rebuild [matcha_\*]  

### Available containers:

- matcha_db  
- matcha_backend  
- matcha_fronted  

## Api routes

ex: curl --location --request GET 'localhost:8080/api/[YOUR_ROUTE]'

### user/

- GET user/ - fetches all users in database
- POST user/ - creates a new user in the database  
requires a user as payload:  
{  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;login: String  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;password: String  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;email: String  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name: String  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;surname: String  
}
- GET user/:login - fetches one user from by login


To be continued ...