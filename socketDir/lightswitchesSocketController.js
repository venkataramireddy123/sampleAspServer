var commonMethods = require('../controllers/commonMethods')();

module.exports = function (socket, pool, io) {
    socket.on("lightswitches_GetAll", function (data) {
        pool.getConnection(function (err, connection) {
            // connected! (unless `err` is set)
            if (err) {
                socket.emit("Network Error", {
                    'ResultCode': 202,
                    'details': undefined,
                    'ResultText': "No Network found!"
                });
                return;
            };

            connection.query('SELECT * FROM hau_lightswitches;', function (error, results, fields) {
                // And done with the connection.
                connection.release();

                // Handle error after the release.
                if (error) {
                    socket.emit("Network Error", {
                        'ResultCode': 202,
                        'details': undefined,
                        'ResultText': "No Network found!"
                    });
                    return;
                };

                // Don't use the connection here, it has been returned to the pool.
                // res.send({ 'ResultCode': 200, 'details': results, 'ResultText': "" });
                socket.emit("lightswitches_GetAll", { 'ResultCode': 200, 'details': results, 'ResultText': "" });
            });
        });


    });
    socket.on("lightswitches_GetAllByLightId", function (data) {
        pool.getConnection(function (err, connection) {
            // connected! (unless `err` is set)
            if (err) {
                socket.emit("Network Error", {
                    'ResultCode': 202,
                    'details': undefined,
                    'ResultText': "No Network found!"
                });
                return;
            };

            connection.query('select ls.*,l.*,s.*,b.*,r.* from hau_lightswitches ls inner join hau_lights l on ls.LSWT_LIGH_ID = l.LIGH_ID inner join hau_switchs s on ls.LSWT_SWIT_ID = s.SWIT_ID inner join hau_boards b on s.SWIT_BORD_ID = b.BORD_ID inner join hau_rooms r on b.BORD_ROOM_ID = r.ROOM_ID where (ls.LSWT_ISDELETED  is null or ls.LSWT_ISDELETED = 0) and ls.LSWT_LIGH_ID = ' + data.LSWT_LIGH_ID, function (error, results, fields) {
                // And done with the connection.
                connection.release();

                // Handle error after the release.
                if (error) {
                    socket.emit("Network Error", {
                        'ResultCode': 202,
                        'details': undefined,
                        'ResultText': "No Network found!"
                    });
                    return;
                };

                // Don't use the connection here, it has been returned to the pool.
                socket.emit("lightswitches_GetAllByLightId", { 'ResultCode': 200, 'details': results, 'ResultText': "" });
            });
        });

    });
    socket.on("lightswitches_GetByID", function (data) {
        pool.getConnection(function (err, connection) {
            // connected! (unless `err` is set)
            if (err) {
                socket.emit("Network Error", {
                    'ResultCode': 202,
                    'details': undefined,
                    'ResultText': "No Network found!"
                });
                return;
            };

            connection.query('SELECT * FROM hau_lightswitches where LSWT_ID = ' + data['id'], function (error, results, fields) {
                // And done with the connection.
                connection.release();

                // Handle error after the release.
                if (error) {
                    socket.emit("Network Error", {
                        'ResultCode': 202,
                        'details': undefined,
                        'ResultText': "No Network found!"
                    });
                    return;
                };

                // Don't use the connection here, it has been returned to the pool.
                socket.emit("lightswitches_GetByID", { 'ResultCode': 200, 'details': results, 'ResultText': "" });
            });
        });

    });

    socket.on("lightswitches_postData", function (data) {
        pool.getConnection(function (err, connection) {
            // connected! (unless `err` is set)
            if (err) {
                socket.emit("Network Error", {
                    'ResultCode': 202,
                    'details': undefined,
                    'ResultText': "No Network found!"
                });
                return;
            };
            var obj = data;
            var strString = commonMethods.PopulatePropertiesForSocket(obj, 'LSWT_');
            var strStringRes = commonMethods.PopulatePropertiesResultsForSocket(obj, 'LSWT_');
            console.log(strString);
            if (data["LSWT_ID"]) {
                connection.query('UPDATE hau_lightswitches SET ' + strString, strStringRes, function (error, results, fields) {
                    // And done with the connection.
                    connection.release();

                    // Handle error after the release.
                    if (error) {
                        socket.emit("Network Error", {
                            'ResultCode': 202,
                            'details': undefined,
                            'ResultText': "No Network found!"
                        });
                        return;
                    };

                    // Don't use the connection here, it has been returned to the pool.
                    // res.send({'ResultCode': 200,'details': results.changedRows,'ResultText': ""});
                    socket.emit("lightswitches_postData", data);
                });
            }
            else {
                connection.query('INSERT INTO hau_lightswitches SET ?', data, function (error, results, fields) {
                    // And done with the connection.
                    connection.release();

                    // Handle error after the release.
                    if (err) {
                        socket.emit("Network Error", {
                            'ResultCode': 202,
                            'details': undefined,
                            'ResultText': "No Network found!"
                        });
                        return;
                    };

                    // Don't use the connection here, it has been returned to the pool.
                    // res.send({'ResultCode': 200,'details': results.insertId,'ResultText': ""});
                    socket.emit("lightswitches_postData", results.insertId.toString());
                });
            }
        });

    });


}