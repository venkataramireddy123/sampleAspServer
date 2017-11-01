var express = require('express');
var bodyparser = require('body-parser');
var mysql = require('mysql');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
// var mongoose = require('mongoose');
//var config = require('./config/index');

var port = process.env.port || 4002;
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.use('/assets', express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,token');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
//mongoose.connect(config.getDbConnectionString());
var pool = mysql.createPool({
    "host": "localhost",
    "user": "root",
    "password": "Abc@123",
    "database": "haudb",
    "multipleStatements": true
});

// var pool = mysql.createPool({
//     "host": "35.187.217.62",
//     "user": "root",
//     "password": "Abc@123",
//     "database": "haudb"
// });



var socketController = require('./socketDir/socketController');
socketController(io, pool);

var entitiesController = require('./controllers/entitiesController');
entitiesController(app, pool);

var entityTypesController = require('./controllers/entityTypesController');
entityTypesController(app, pool);


var rolesController = require('./controllers/rolesController');
rolesController(app, pool);

var pagesOrParametersController = require('./controllers/pagesOrParametersController');
pagesOrParametersController(app, pool);

var pagewiseroleaccessController = require('./controllers/pagewiseroleaccessController');
pagewiseroleaccessController(app, pool);

var userController = require('./controllers/userController');
userController(app, pool);

var acController = require('./controllers/acController');
acController(app, pool);

var acsextraswitchesController = require('./controllers/acsextraswitchesController');
acsextraswitchesController(app, pool);

var acswitchesController = require('./controllers/acswitchesController');
acswitchesController(app, pool);


var boardController = require('./controllers/boardController');
boardController(app, pool);

var errorlogController = require('./controllers/errorlogController');
errorlogController(app, pool);

var fansController = require('./controllers/fansController');
fansController(app, pool);

var fanwitchesController = require('./controllers/fanwitchesController');
fanwitchesController(app, pool);

var lightsController = require('./controllers/lightsController');
lightsController(app, pool);

var lightswitchesController = require('./controllers/lightswitchesController');
lightswitchesController(app, pool);

var pagesOrParametersController = require('./controllers/pagesOrParametersController');
pagesOrParametersController(app, pool);

var pagewiseroleaccessController = require('./controllers/pagewiseroleaccessController');
pagewiseroleaccessController(app, pool);

var priorityController = require('./controllers/priorityController');
priorityController(app, pool);

var rolesController = require('./controllers/rolesController');
rolesController(app, pool);

var roomsController = require('./controllers/roomsController');
roomsController(app, pool);

var roomtypesController = require('./controllers/roomtypesController');
roomtypesController(app, pool);

var schedulingController = require('./controllers/schedulingController');
schedulingController(app, pool);

var sensorsController = require('./controllers/sensorsController');
sensorsController(app, pool);

var sensortypesController = require('./controllers/sensortypesController');
sensortypesController(app, pool);

var switchsController = require('./controllers/switchsController');
switchsController(app, pool);

var switchtypesController = require('./controllers/switchtypesController');
switchtypesController(app, pool);

var tokenController = require('./controllers/tokenController');
tokenController(app, pool);

var tubelightsController = require('./controllers/tubelightsController');
tubelightsController(app, pool);

var tubelightswitchesController = require('./controllers/tubelightswitchesController');
tubelightswitchesController(app, pool);

var tvsController = require('./controllers/tvsController');
tvsController(app, pool);

var tvsextraswitchesController = require('./controllers/tvsextraswitchesController');
tvsextraswitchesController(app, pool);

var userrolesController = require('./controllers/userrolesController');
userrolesController(app, pool);

var tvswitchesController = require('./controllers/tvswitchesController');
tvswitchesController(app, pool);

var userwiseboardaccessController = require('./controllers/userwiseboardaccessController');
userwiseboardaccessController(app, pool);

server.listen(port);
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});   
app.get('/ping', function(req, res) {
    res.send('pong');
});