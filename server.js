var express = require('express');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var log4js = require('log4js');
var _ = require('underscore');
var fs = require('fs');
var config = require('./config');
var app = express();

var logDirectory = __dirname + '/logs';
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

log4js.configure({
    appenders: [{
        type: 'console'
    }, {
        type: 'file',
        filename: logDirectory + '/ErrorHandling.log',
        maxLogSize: 1000000,
        backups: 10
    }]
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

var logger = log4js.getLogger('ErrorHandling');
var knex = require('knex')(config.db);
var bookshelf = require('bookshelf')(knex);
var User = bookshelf.Model.extend({
    tableName: 'users'
});

function success(req, res, next) {
    var responseData = res.responseData;
    if (!responseData) {
        res.errorMessage = 'Requested resource not found.';
        return next(new Error(res.errorMessage));
    }
    res.json({
        success: true,
        data: responseData
    });
}

function error(err, req, res, next) {
    //adds all missing frames to stack
    Error.captureStackTrace(err);
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
            error: _.pick(err, ['code', 'file', 'line', 'message', 'severity', 'stack'])
        });
    }
    res.json(_.extend(response, {
        message: res.errorMessage || 'We are sorry, error occured.',
        success: false
    }));
}

//favicon
app.use(favicon(__dirname + '/app/favicon.ico'));

//route app path
app.use('/', express.static(__dirname + "/app"));

app.get('/users', function (req, res, next) {
    User.fetchAll().then(function (model) {
        res.responseData = model.toJSON();
        next();
    }).catch(function (err) {
        res.errorMessage = 'Failed to get users.';
        next(err);
    });
});

app.get('/user/:id', function (req, res, next) {
    User.where('id', req.params.id).fetch({
        require: true
    }).then(function (model) {
        res.responseData = model.toJSON();
        next();
    }).catch(function (err) {
        res.errorMessage = 'Failed to get user.';
        next(err);
    });
});

app.post('/user/create', function (req, res, next) {
    new User(_.pick(req.body, ['fname', 'lname', 'age'])).save().then(function (model) {
        res.responseData = model.toJSON();
        next();
    }).catch(function (err) {
        res.errorMessage = 'Failed to create user.';
        next(err);
    });
});

app.post('/user/update', function (req, res, next) {
    new User(_.pick(req.body, ['id', 'fname', 'lname', 'age'])).save().then(function (model) {
        res.responseData = model.toJSON();
        next();
    }).catch(function (err) {
        res.errorMessage = 'Failed to update user.';
        next(err);
    });
});

app.delete('/user/destroy/:id', function (req, res, next) {
    User.where('id', req.params.id).destroy({
        require: true
    }).then(function (model) {
        res.responseData = model.toJSON();
        next();
    }).catch(function (err) {
        res.errorMessage = 'Failed to delete user.';
        next(err);
    });
});

app.use(success);
app.use(error);

app.listen(3000);