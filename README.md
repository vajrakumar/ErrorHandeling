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

* Now copy your `ext` framework directory to `ErrorHandling/app/ext`. 
* Navigate to ext app directory `$ cd app`
* Assuming you have access to `sencha` command line tools, now hit `$ sencha app build development`
* Navigate back to root directory of the project `$ cd ..`
* Now hit `$ node server.js` which will start the node server at [http://localhost:3000/](http://localhost:3000/)

##Guidelines

###log4js

This project uses log4js for logging any information / errors from the system. 

* We are using `Console` and `File` appenders, so everything will be printed to console as well as the log file.


```
var log4js = require('log4js');
log4js.configure({
    appenders: [{
        type: 'console'
    }, {
        type: 'file',
        filename: './logs/ErrorHandling.log',
        maxLogSize: 1000000,
        backups: 10
    }]
});
```

* `filename` holds a relative path for storing log files.
* `maxLogSize` holds a integer value (in bytes), whenever the current log file exceeds this size limit, log4js will rename that file to `ErrorHandling.log.x` (where `x` will be the number of log files stored) and creates new file for further logging.
* `backups` holds a integer value, whenever the backup log files exceeds this limit log4js will delete the old files. 

### Using `next` in express 

An Express application is essentially a series of middleware function calls. Middleware functions are functions that have access to the request object (`req`), the response object (`res`), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named `next`.

**If the current middleware function does not end the request-response cycle, it must call `next()` to pass control to the next middleware function.**

Here are the different middleware functions we have used in our application,

Boday Parser is a third-party middleware function that matches all the requests (when route path is not specified, then that middleware function will be executed on all the requests to the server), which will be executed first before any other middleware function in `server.js`, parses the data sent on the request body. `req.body` will be valid only when this middleware function is executed.

Body Parser will not involve in any response cycle, so it will just call `next()` which will transfer the control back to `server.js`.

```
app.use(bodyParser.json());
```

Then comes to the built-in middleware function `express.static` (only when the path matches `'/'`) to load the ExtJS client application.

```
app.use('/', express.static(__dirname + "/app"));
```

Thereafter we have several application-level middlewares defined for specific path to handle the API requests. And finally at the bototm we got one application-level middleware named `success` and one error-handling middleware named `error`, either of this will be called based on the response from `PGSQL` or `Bookshelf`.

```
app.use(success);
app.use(error);
```

Here we go with a example

Let's assume the following request hits our server

`http://localhost:3000/user/24`

As discussed above, the first middleware will be body parser which will parse the request body for the other middlewares. Then it reaches the user get function,

```
app.get('/user/:id', function (req, res, next) {
    User.where('id', req.params.id).fetch({
        require: true
    }).then(function (model) {
        req.model = model;
        next();
    }).catch(function (err) {
        req.errorMessage = 'Failed to get user.';
        next(err);
    });
});
```

Where we use `bookshelf` to get the particular user record from `PGSQL`. Let's assume we have no user record associated with id 24, so it will throw an error (because we have passed `require: true` to `fetch`, if `require` is set to `false` `bookshelf` will not throw an error. for more details go through [Bookshelfjs](http://bookshelfjs.org/)) and the control is transferred to the catch block where we append a user friendly error message to request object (`req.errorMessage = 'Failed to get user.';`) then call `next` with error object (`next(err);`).

The only difference between error-hanlding middleware and others is, they should be defined after all other middlewares on the app object with 4 arguments instead of 3.

```
function error(err, req, res, next) {
    logger.trace('********Start********');
    logger.debug('path', req.path);
    logger.debug('method', req.method);
    logger.debug('query', req.query);
    logger.debug('body', req.body);
    logger.error(err);
    logger.trace('********End********');
    var response = {};
    if (config.enableErrorDescription) {
        _.extend(response, {
            errorCode: err.code,
            errorMessage: err.message
        });
    }
    res.json(_.extend(response, {
        message: req.errorMessage || 'We are sorry, error occured.',
        success: false
    }));
}
```

As the catch block calls the `next` callback with a error object as first argument (`next(err);`), the control will be transferd to the error-handling middleware, where we log the error and other essential information with log4js then sends a error response to the client.

Now let's assume we do have a user record associated with id 24, now the control will be transfered to the promise function where we append the user model to the request object (`req.model = model;`) then call `next` callback wihout any argument (`next()`) which means the control should be transferred to the next application-level middleware and not error-handling middleware.

```
function success(req, res, next) {
    var model = req.model;
    if (!model) {
        req.errorMessage = 'Requested resource not found.';
        return next(new Error(req.errorMessage));
    }
    res.json({
        success: true,
        data: model.toJSON()
    });
}
```

The success middleware verifies whether the request object has a valid model, if then sends a success response to the client.

Whenver a invalid request is passed to the server, for example

`http://localhost:3000/SomethingNotDefined`

It will directly hit the success middleware function (only after body parser as per the hierarchy), as the request object won't have a valid model it will call the `next` callback with a generic error object, now the control will be transfered to error-handling middleware and failure response is sent to the client.

**Note:** Even if there is no error-handling middlewares defined in our app, express will have it's own default error-handling middleware at the bottom of middleware stack which will just send the stack trace on the response body.

###Refernces

* http://expressjs.com/en/api.html
* http://expressjs.com/en/guide/using-middleware.html
* http://expressjs.com/en/guide/error-handling.html
