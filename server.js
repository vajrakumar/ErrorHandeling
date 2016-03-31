var express = require('express');
var app = express();

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

var logger = log4js.getLogger('ErrorHandling');

var _ = require('underscore');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

var knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: '1',
        database: 'users_directory',
        charset: 'utf8'
    }
});
var bookshelf = require('bookshelf')(knex);
var User = bookshelf.Model.extend({
    tableName: 'users'
});

function success(req, res, next) {
    var model = req.model;
    if (!model) {
        req.errorMessage = 'Requested model not found.';
        return next(new Error(req.errorMessage));
    }
    res.json({
        success: true,
        data: model.toJSON()
    });
}

function error(err, req, res, next) {
    logger.trace('********Start********');
    logger.debug('path', req.path);
    logger.debug('method', req.method);
    logger.debug('query', req.query);
    logger.debug('body', req.body);
    logger.error(err);
    logger.trace('********End********');
    res.json(_.extend(_.pick(err, ['code']), {
        message: req.errorMessage || 'We are sorry, error occured.',
        success: false
    }));
}

//route app path
app.use('/', express.static(__dirname + "/app"));

app.get('/users', function (req, res, next) {
    User.fetchAll().then(function (model) {
        req.model = model;
        next();
    }).catch(function(err){
        req.errorMessage = 'Failed to get users.'
        next(err);
    });
});

app.get('/user/:id', function (req, res, next) {
    User.where('id', req.params.id).fetch({
        require: true
    }).then(function (model) {
        req.model = model;
        next();
    }).catch(function(err){
        req.errorMessage = 'Failed to get user.'
        next(err);
    });
});

app.post('/user/create', function (req, res, next) {
    new User(_.pick(req.body, ['fname', 'lname', 'age'])).save().then(function (model) {
        req.model = model;
        next();
    }).catch(function(err){
        req.errorMessage = 'Failed to create user.'
        next(err);
    });
});

app.post('/user/update', function (req, res, next) {
    new User(_.pick(req.body, ['id', 'fname', 'lname', 'age'])).save().then(function (model) {
        req.model = model;
        next();
    }).catch(function(err){
        req.errorMessage = 'Failed to update user.'
        next(err);
    });
});

app.delete('/user/destroy/:id', function (req, res, next) {
    User.where('id', req.params.id).destroy({
        require: true
    }).then(function (model) {
        req.model = model;
        next();
    }).catch(function(err){
        req.errorMessage = 'Failed to delete user.'
        next(err);
    });
});

app.use(success);
app.use(error);

app.listen(3000);