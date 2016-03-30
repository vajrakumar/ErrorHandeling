var express = require('express');
var app = express();

var _ = require('underscore');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

var knex = require('knex')({
    client: 'pg',
    connection: {
        host     : '127.0.0.1',
        user     : 'postgres',
        password : '1',
        database : 'users_directory',
        charset  : 'utf8'
    }
});
var bookshelf = require('bookshelf')(knex);
var User = bookshelf.Model.extend({
    tableName: 'users'
});

function success(res, model){
    res.json({
        success: true,
        data: model.toJSON()
    });
}

function error(res, err){
    res.json(_.defaults(_.pick(err, ['code', 'message']), {
        success: false
    }));
}

//route app path
app.use('/', express.static(__dirname + "/app"));

app.get('/users', function (req, res) {
    User.fetchAll().then(function(model){
        success(res, model);
    }).catch(function(err){
        error(res, err);
    });
});

app.get('/user/:id', function (req, res) {
    User.where('id', req.params.id).fetch({
        require: true
    }).then(function(model){
        success(res, model);
    }).catch(function(err){
        error(res, err);
    });
});

app.post('/user/create', function (req, res) {
    new User(_.pick(req.body, ['fname', 'lname', 'age'])).save().then(function(model){
        success(res, model);
    }).catch(function(err){
        error(res, err);
    });
});

app.post('/user/update', function (req, res) {
    new User(_.pick(req.body, ['id', 'fname', 'lname', 'age'])).save().then(function(model){
        success(res, model);
    }).catch(function(err){
        error(res, err);
    });
});

app.delete('/user/destroy/:id', function (req, res) {
    User.where('id', req.params.id).destroy({
        require: true
    }).then(function(model){
        success(res, model);
    }).catch(function(err){
        error(res, err);
    });
});

app.listen(3000);