s = require('../controllers/commonMethods')();
module.exports = function (socket, pool, io) {
    socket.on("fanwitches_GetAll", function (data) {
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

            connection.query('SELECT * FROM hau_fanswitches;', function (error, results, fields) {
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
                socket.emit("fanwitches_GetAll", { 'ResultCode': 200, 'details': results, 'ResultText': "" });
            });
        });
    });
    socket.on("fanwitches_GetAllByFanId", function (data) {
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

            connection.query('select fs.*,f.*,s.*,b.*,r.* from hau_fanswitches fs inner join hau_fans f on fs.FSWT_FAN_ID = f.FAN_ID inner join hau_switchs s on fs.FSWT_SWIT_ID = s.SWIT_ID inner join hau_boards b on s.SWIT_BORD_ID = b.BORD_ID inner join hau_rooms r on b.BORD_ROOM_ID = r.ROOM_ID where (fs.FSWT_ISDELETED  is null or fs.FSWT_ISDELETED = 0) and fs.FSWT_FAN_ID = ' + data.FSWT_FAN_ID, function (error, results, fields) {
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
                socket.emit("fanwitches_GetAllByFanId", { 'ResultCode': 200, 'details': results, 'ResultText': "" });
            });
        });

    });
    socket.on("fanwitches_GetByID", function (data) {
        pool.getConnection(function (err, connection) {
            // connected! (unless `err` is set)
            if (err) {
                socket.emit("Network Error", {
                    'ResultCode': 202,
                    'details': undefined,
                    'ResultText': "No Network found!"
                }); return;
            };

            connection.query('SELECT * FROM hau_fanwitches where FSWT_ID = ' + data['id'], function (error, results, fields) {
                // And done with the connection.
                connection.release();

                // Handle error after the release.
                if (error) {
                    socket.emit("Network Error", {
                        'ResultCode': 202,
                        'details': undefined,
                        'ResultText': "No Network found!"
                    }); return;
                };

                // Don't use the connection here, it has been returned to the pool.
                socket.emit("fanwitches_GetByID", { 'ResultCode': 200, 'details': results, 'ResultText': "" });
            });
        });

    });

    socket.on("fanwitches_postData", function (data) {
        pool.getConnection(function (err, connection) {
            // connected! (unless `err` is set)
            if (err) {
                socket.emit("Network Error", {
                    'ResultCode': 202,
                    'details': undefined,
                    'ResultText': "No Network found!"
                }); return;
            };
            var obj = data;

            var strString = commonMethods.PopulatePropertiesForSocket(obj, "FSWT_");
            var strStringRes = commonMethods.PopulatePropertiesResultsForSocket(obj, "FSWT_");
            console.log(strString);
            if (data["FSWT_ID"]) {
                connection.query("SELECT * FROM hau_fanswitches where (FSWT_ISDELETED  is null or FSWT_ISDELETED = 0) and  FSWT_ID <>" + data.FSWT_ID + " and FSWT_FAN_ID = " + data.FSWT_FAN_ID + " and FSWT_SWIT_ID =" + data.FSWT_SWIT_ID + " ;", function (error1, results1, fields1) {
                    if (error1) {
                        socket.emit("Network Error", {
                            'ResultCode': 202,
                            'details': undefined,
                            'ResultText': "No Network found!"
                        });     return;
                    };
                    if (results1.length == 0) {

                        connection.query('UPDATE hau_fanwitches SET ' + strString, strStringRes, function (error, results, fields) {
                            // And done with the connection.
                            connection.release();

                            // Handle error after the release.
                            if (error) {
                                socket.emit("Network Error", {
                                    'ResultCode': 202,
                                    'details': undefined,
                                    'ResultText': "No Network found!"
                                }); return;
                            };

                            // Don't use the connection here, it has been returned to the pool.
                            // res.send({'ResultCode': 200,'details': results.changedRows,'ResultText': ""});
                            socket.emit("fanwitches_postData", results.changedRows.toString());
                        });
                    } else {
                        connection.release();
                        socket.emit("showMessage", {
                            'ResultCode': 204,
                            'details': undefined,
                            'ResultText': "Tubelight Already exist Please Try another name!"
                        });
                        return;
                    }
                });
            } else {
                data.FSWT_CREATEDDATE = commonMethods.GetDateToString(data.FSWT_CREATEDDATE);
                connection.query("SELECT * FROM hau_fanswitches where (FSWT_ISDELETED  is null or FSWT_ISDELETED = 0) and FSWT_FAN_ID = " + data.FSWT_FAN_ID + " and FSWT_SWIT_ID =" + data.FSWT_SWIT_ID + " ;", function (error1, results1, fields1) {
                    if (error1) {        
                        socket.emit("Network Error", {
                        'ResultCode': 202,
                        'details': undefined,
                        'ResultText': "No Network found!"
                    });
                        return;
                    };
                    if (results1.length == 0) {

                        connection.query('INSERT INTO hau_fanwitches SET ?', data, function (error, results, fields) {
                            // And done with the connection.
                            connection.release();

                            // Handle error after the release.
                            if (error) {
                                socket.emit("Network Error", {
                                    'ResultCode': 202,
                                    'details': undefined,
                                    'ResultText': "No Network found!"
                                }); return;
                            };

                            // Don't use the connection here, it has been returned to the pool.
                            // res.send({'ResultCode': 200,'details': results.insertId,'ResultText': ""});
                            socket.emit("fanwitches_postData", results.insertId.toString());
                        });
                    } else {
                        connection.release();
                        socket.emit("showMessage", {
                            'ResultCode': 204,
                            'details': undefined,
                            'ResultText': "Tubelight Already exist Please Try another name!"
                        });
                        return;
                    }
                });
            }
        });

    });


}