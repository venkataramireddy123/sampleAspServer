var commonMethods = require('../controllers/commonMethods')();

module.exports = function (socket, pool, io) {
    socket.on("entities_GetAll", function (data) {
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

            connection.query('SELECT * FROM hau_entities;', function (error, results, fields) {
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
                // res.send({ 'ResultCode': 200, 'details': results, 'ResultText': "" });
                socket.emit("entities_GetAll", { 'ResultCode': 200, 'details': results, 'ResultText': "" });
            });
        });

    });
    socket.on("entities_GetByID", function (data) {
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

            connection.query('SELECT * FROM hau_entities where ENTT_ID = ' + data['id'], function (error, results, fields) {
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
                socket.emit("entities_GetByID", {
                    'ResultCode': 200,
                    'details': results,
                    'ResultText': ""
                });
            });
        });

    });

    socket.on("entities_postData", function (data) {
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

            var strString = commonMethods.PopulatePropertiesForSocket(obj, "ENTT_");
            var strStringRes = commonMethods.PopulatePropertiesResultsForSocket(obj, "ENTT_");
            console.log(strString);
            if (data["ENTT_ID"]) {
                connection.query("SELECT * FROM hau_entities where (ENTT_ISDELETED  is null or ENTT_ISDELETED = 0) and ENTT_ID <>" + data.ENTT_ID + " and (ENTT_NAME = '" + data.ENTT_NAME + "' or ENTT_IDENTITY ='" + data.ENTT_IDENTITY + "') ;", function (error1, results1, fields1) {
                    if (error1) {
                        socket.emit("Network Error", {
                            'ResultCode': 202,
                            'details': undefined,
                            'ResultText': "No Network found!"
                        });
                        return;
                    };
                    if (results1.length == 0) {

                        connection.query('UPDATE hau_entities SET ' + strString, strStringRes, function (error, results, fields) {
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
                            // res.send({'ResultCode': 200,'details': results.changedRows,'ResultText': ""});
                            io.to(socket.USER.homeid).emit("entities_postData", data);
                        });
                    
                    } else {
                        connection.release();
                        socket.emit("showMessage",{
                            'ResultCode': 204,
                            'details': undefined,
                            'ResultText': "ENTT Already exist Please Try another name!"
                        });
                        return;
                    }
                });
            }
            else {
                data.ENTT_CREATEDDATE = commonMethods.GetDateToString(data.ENTT_CREATEDDATE);
                connection.query("SELECT * FROM hau_entities where (ENTT_ISDELETED  is null or ENTT_ISDELETED = 0) and (ENTT_NAME = '" + data.ENTT_NAME + "' or ENTT_IDENTITY ='" + data.ENTT_IDENTITY + "') ;", function (error1, results1, fields1) {
                    if (error1) {
                        socket.emit("Network Error", {
                            'ResultCode': 202,
                            'details': undefined,
                            'ResultText': "No Network found!"
                        });
                        return;
                    };
                    if (results1.length == 0) {

                        connection.query('INSERT INTO hau_entities SET ?', data, function (error, results, fields) {
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
                            socket.emit("entities_postData", results.insertId.toString());
                        });
                    
                    } else {
                        connection.release();
                        socket.emit("showMessage",{
                            'ResultCode': 204,
                            'details': undefined,
                            'ResultText': "ENTT Already exist Please Try another name!"
                        });
                        return;
                    }
                });
            }
        });
    });


}