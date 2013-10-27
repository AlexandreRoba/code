
/**
 * Module dependencies.
 */
require('coffee-script');

var express = require('express');
    RedisStore = require('connect-redis')(express);

var http = require('http');
var path = require('path');

var app = module.exports = express.createServer();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options',{layout:true});
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({
    secret:"dsfhgjfdshgkshgkdshglsifdshf",
    store: new RedisStore
}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

if ('test' == app.get('env')) {
    app.set('port',3001);
}

//Routes
require('./apps/authentication/routes')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
