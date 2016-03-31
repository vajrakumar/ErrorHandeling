# ErrorHandling

This project is to explain the error handeling in server side (Node.js & Express.js) and transferring the same to client side (ExtJS).
It alos includes
* Displaying proper user friendly (non technical) error messages.

## Technologies used:
* Client side : ExtJS 6.0.1
* Server side : Node.js
	* Modules
		* Express.js ~4.13.1
		* Bookshelf.js
* Database : PostgreSQL 9.5

##Installation

* Check out a copy of the source from git: `$ git clone https://github.com/vajrakumar/ErrorHandling.git`
* Navigate to root directory of the project: `$ cd ErrorHandling`
* Download all the required node modules: `$ npm install`
* Assuming you have already installed PostgreSQL in your local machine, open `pgAdmin III` and create a database named `users_directory`
* Now restore the backup file `pgsql` found at root directory of the project to `users_directory`
* Create a new directory called `logs` at root directory of the project, where all error logs will be stored.
* Open `config.js` found at root directory of the project and update `connection` object.

```
       //connection details for database
       db: {
           client: 'pg',
           connection: {
               host: '127.0.0.1',
               user: 'YOUR_USER_NAME',
               password: 'YOUR_PASSWORD',
               database: 'users_directory',
               charset: 'utf8'
           }
       }
```

* Now copy your `ext` framework directory to `ErrorHandling/app/ext`. This project was built with `ext 6.0.1`.
* Navigate to ext app directory `$ cd app`
* Assuming you have access to `sencha` command line tools, now hit `$ sencha app build development`
* Navigate back to root directory of the project `$ cd ..`
* Now hit `$ node server.js` which will start the node server at [http://localhost:3000/](http://localhost:3000/)
