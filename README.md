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

* Check out a copy of the source from git: `$ git clone https://github.com/vajrakumar/ErrorHandeling.git`
* Navigate to project root directory: `$ cd ErrorHandeling`
* Download all the required node modules: `$ npm install`
* Assuming you have already installed PostgreSQL in your local machine, open `pgAdmin III` and create a database called `users_directory`
* Now restore the backup file `pgsql` found at root directory of the project to `users_directory`
* Create a new directory called `logs` at root directory of project, where all error logs will be stored.
* Open `server.js` found at root directory of project and update `connection` object.

```
var knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'YOUR_USER_NAME_HERE',
        password: 'YOUR_PASSWORD_HERE',
        database: 'users_directory',
        charset: 'utf8'
    }
});
```

* Now copy your `ext` framework directory to `ErrorHandeling/app/ext`. This project was built with `ext 6.0.1`.
* Navigate to ext app directory `$ cd app`
* Assuming you have access to `sencha` command line tool, now hit `$ sencha app build development`
* Navigate back to your root directory `$ cd ..` 
* Now hit `$ node server.js` which will start the node server at [http://localhost:3000/](http://localhost:3000/)
