
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var bodyParser=require('body-parser');
var users=require('./routes/register-users');
var expressValidator=require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');

//load customers route
var customers = require('./routes/customers');
var app = express();
app.use(express.cookieParser('secret'));
app.use(express.cookieSession());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());




var connection  = require('express-myconnection'); 
var mysql = require('mysql');





// all environments

app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request 
-------------------------------------------*/

app.use(
    
    connection(mysql,{
        
        host: 'localhost',
        user: 'root',
        password : 'root',
        port : 3306, //port mysql
        database:'my_node-1'

    },'pool') //or single

);

app.use(flash());
// app.use(expressValidator);
app.get('/', routes.index);
app.get('/customers', customers.list);
app.get('/customers/add', customers.add);
app.post('/customers/add', customers.save);
app.get('/customers/delete/:id', customers.delete_customer);
app.get('/customers/edit/:id', customers.edit);
app.post('/customers/edit/:id',customers.save_edit);

/* user registration -start- */
app.get('/register', users.form);
app.post('/register/add', users.add);
app.get('/register/add', users.add);
/* user registration -start- */
app.use(app.router);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
