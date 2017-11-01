var commonMethods = require('./../controllers/commonMethods')();
var entitiesSocketControler = require('./entitiesSocketControler');
var acsextraswitchesSocketController = require('./acsextraswitchesSocketController');
var acSocketController = require('./acSocketController');
var acswitchesSocketController = require('./acswitchesSocketController');
var boardSocketController = require('./boardSocketController');
var errorlogSocketController = require('./errorlogSocketController');
var fansSocketController = require('./fansSocketController');
var fanwitchesSocketController = require('./fanwitchesSocketController');
var lightsSocketController = require('./lightsSocketController');
var lightswitchesSocketController = require('./lightswitchesSocketController');
var pagesOrParametersSocketController = require('./pagesOrParametersSocketController');
var pagewiseroleaccessSocketController = require('./pagewiseroleaccessSocketController');
var prioritySocketController = require('./prioritySocketController');
var rolesSocketController = require('./rolesSocketController');
var roomsSocketController = require('./roomsSocketController');
var roomtypesSocketController = require('./roomtypesSocketController');
var schedulingSocketController = require('./schedulingSocketController');
var sensortypesSocketController = require('./sensortypesSocketController');
var sensorsSocketController = require('./sensorsSocketController');
var switchsSocketController = require('./switchsSocketController');
var switchtypesSocketController = require('./switchtypesSocketController');
var tokenSocketController = require('./tokenSocketController');
var tubelightsSocketController = require('./tubelightsSocketController');
var tubelightswitchesSocketController = require('./tubelightswitchesSocketController');
var tvsextraswitchesSocketController = require('./tvsextraswitchesSocketController');
var tvsSocketController = require('./tvsSocketController');
var tvswitchesSocketController = require('./tvswitchesSocketController');
var userrolesSocketController = require('./userrolesSocketController');
var userSocketController = require('./userSocketController');
var userwiseboardaccessSocketController = require('./userwiseboardaccessSocketController');
//var url = require('url');
module.exports = function (io, pool) {
    // io.use(function (socket, next) {
    //     // debugger;
    //     // var url_parts = url.parse(request.url, true);
    //     // var query = url_parts.query;
    //     // var id = req.query.token;
    //     console.log(socket.handshake.query.token);
    //     if(socket.handshake.query.token == undefined){
    //         socket.emit("authenticationFailure", {});
    //         return;
    //     }
    //     var re = /;;;/gi;
    //     var str = socket.handshake.query.token;
    //     var newstr = str.replace(re, "="); 

    //     var token = newstr;
    //     console.log(token);
    //     socket.token = token;

    //     var decToken = commonMethods.decrypt(token);
    //     commonMethods.parseTokenForSockets(pool, socket, token, decToken, function (error) {
    //         console.log(error);
    //         // debugger;

    //         setTimeout(function(){ 
    //             socket.emit("authenticationFailure", {});
    //         }, 3000);
    //         next();
    //     }, function () {
    //         // debugger;
    //         next();
    //         // socket.emit("authenticationFailure", {});

    //     });
    //     // authorize using authorization header in socket.request.headers
    // });

    io.on('connection', function (socket) {
        // debugger;
        // console.log(JSON.stringify(socket));
        console.log('new user');
        socket.on('authenticate', function (data) {
            console.log('message: ' + data);
            console.log(socket.handshake.query.token);
            if (socket.handshake.query.token == undefined) {
                console.log('Token undefined ');

                // socket.emit("authenticationFailure", {});
                if (data['boardid']) {
                    console.log('data[boardid] ' + data['boardid']);

                    // var res = data.split("|||");
                    // if (res.length > 0) {
                    pool.getConnection(function (err, connection) {
                        // connected! (unless `err` is set)
                        console.log('pool started' );

                        if (err) {
                            socket.emit("Network Error", {
                                'ResultCode': 202,
                                'details': undefined,
                                'ResultText': "No Network found!"
                            });
                            return;
                        };
                        console.log('pool ok' );
                        
                        connection.query('SELECT * FROM hau_boards b inner join hau_rooms r on r.ROOM_ID = b.BORD_ROOM_ID inner join hau_entities e on e.ENTT_ID = r.ROOM_ENTT_ID where BORD_ID = ' + data.boardid + ' and e.ENTT_ID = ' + data.orgid, function (error, results, fields) {
                            // And done with the connection.
                            connection.release();

                            console.log('query started' );
                            console.log('SELECT * FROM hau_boards b inner join hau_rooms r on r.ROOM_ID = b.BORD_ROOM_ID inner join hau_entities e on e.ENTT_ID = r.ROOM_ENTT_ID where BORD_ID = ' + data.boardid + ' and e.ENTT_ID = ' + data.orgid);
                            // Handle error after the release.
                            if (error) {
                                console.log('query error'+JSON.stringify(error) );
                            
                                socket.emit("Network Error", {
                                    'ResultCode': 202,
                                    'details': undefined,
                                    'ResultText': "No Network found!"
                                });
                                return;
                            };
                            console.log('query result'+JSON.stringify(results) );
                            
                            if (results.length > 0) {
                                socket.emit("Authenticated", {
                                    'ResultCode': 200,
                                    'details': results,
                                    'ResultText': ""
                                });
                            } else {
                                socket.emit("authenticationFailure", {});
                            }
                            // Don't use the connection here, it has been returned to the pool.
                            // res.send({ 'ResultCode': 200, 'details': results, 'ResultText': "" });

                        });
                    });

                    //if(data.boardid)
                    // socket.isdevice = true;
                    // socket.device = data;
                    // socket.isAuthenticated = true;

                    // socket.emit('Authenticated', {});

                    // }
                    // else {
                    //     socket.emit("authenticationFailure", {});

                    // }

                }
                // return;
            } else {
                var re = /;;;/gi;
                var str = socket.handshake.query.token;
                var newstr = str.replace(re, "=");

                var token = newstr;
                console.log(token);
                socket.token = token;

                var decToken = commonMethods.decrypt(token);
                commonMethods.parseTokenForSockets(pool, socket, token, decToken, function (error) {
                    console.log(error);
                    // debugger;
                    socket.emit("authenticationFailure", {});
                }, function () {
                    // debugger;
                    socket.isdevice = false;
                    socket.isAuthenticated = true;
                    socket.emit('Authenticated', {});

                });
            }

        })

        socket.on('sendMessage', function (data) {
            console.log('message: ' + data);

            io.sockets.emit('new message', data);
        })
        socket.on('sendMessage1', function (data) {
            console.log('message: ' + data);

            io.sockets.emit('new message1', data);
        })
        entitiesSocketControler(socket, pool, io);
        acsextraswitchesSocketController(socket, pool, io);
        acSocketController(socket, pool, io);
        acswitchesSocketController(socket, pool, io);
        boardSocketController(socket, pool, io);
        errorlogSocketController(socket, pool, io);
        fansSocketController(socket, pool, io);
        fanwitchesSocketController(socket, pool, io);
        lightsSocketController(socket, pool, io);
        lightswitchesSocketController(socket, pool, io);
        pagesOrParametersSocketController(socket, pool, io);
        pagewiseroleaccessSocketController(socket, pool, io);
        prioritySocketController(socket, pool, io);
        rolesSocketController(socket, pool, io);
        roomsSocketController(socket, pool, io);
        roomtypesSocketController(socket, pool, io);
        schedulingSocketController(socket, pool, io);
        sensorsSocketController(socket, pool, io);
        sensortypesSocketController(socket, pool, io);
        switchsSocketController(socket, pool, io);
        switchtypesSocketController(socket, pool, io);
        tokenSocketController(socket, pool, io);
        tubelightsSocketController(socket, pool, io);
        tubelightswitchesSocketController(socket, pool, io);
        tvsextraswitchesSocketController(socket, pool, io);
        tvsSocketController(socket, pool, io);
        userrolesSocketController(socket, pool, io);
        userSocketController(socket, pool, io);
        userwiseboardaccessSocketController(socket, pool, io);
        tvswitchesSocketController(socket, pool, io);
        socket.emit('Authenticate', {});
    });

}