var commonMethods = require('../controllers/commonMethods')();

module.exports = function (socket, pool, io) {
    socket.on("acswitches_GetAll", function (data) {
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

            connection.query('SELECT * FROM hau_acswitches;', function (error, results, fields) {
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
                socket.emit("acswitches_GetAll", { 'ResultCode': 200, 'details': results, 'ResultText': "" });
            });
        });
    });
    socket.on("acswitches_GetAllByACId", function (data) {
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

            connection.query('select ts.*,t.*,s.*,b.*,r.* from hau_acswitches ts inner join hau_acs t on ts.ACSW_AC_ID = t.AC_ID inner join hau_switchs s on ts.ACSW_SWIT_ID = s.SWIT_ID inner join hau_boards b on s.SWIT_BORD_ID = b.BORD_ID inner join hau_rooms r on b.BORD_ROOM_ID = r.ROOM_ID where (ts.ACSW_ISDELETED  is null or ts.ACSW_ISDELETED = 0) and ts.ACSW_AC_ID = ' + data.ACSW_AC_ID, function (error, results, fields) {
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
                socket.emit("acswitches_GetAllByACId", { 'ResultCode': 200, 'details': results, 'ResultText': "" });
            });
        });

    });
    socket.on("acswitches_GetByID", function (data) {
        pool.getConnection(function (err, connection) {
            // connected! (unless `err` is set)
            if (err) {
                socket.emit("Network Error", {
                    'ResultCode': 202,
                    'details': undefined,
                    'ResultText': "No Network found!"
                }); return;
            };

            connection.query('SELECT * FROM hau_acswitches where ACSW_ID = ' + data['id'], function (error, results, fields) {
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
                socket.emit("acswitches_GetByID", { 'ResultCode': 200, 'details': results, 'ResultText': "" });
            });
        });

    });

    socket.on("acswitches_postData", function (data) {
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

            var strString = commonMethods.PopulatePropertiesForSocket(obj, "ACSW_");
            var strStringRes = commonMethods.PopulatePropertiesResultsForSocket(obj, "ACSW_");
            console.log(strString);
            if (data["ACSW_ID"]) {
                connection.query("SELECT * FROM hau_acswitches where (ACSW_ISDELETED  is null or ACSW_ISDELETED = 0) and  ACSW_ID <>" + data.ACSW_ID + " and ACSW_AC_ID = " + data.ACSW_AC_ID + " and ACSW_SWIT_ID =" + data.ACSW_SWIT_ID + " ;", function (error1, results1, fields1) {
                    if (error1) {
                        socket.emit("Network Error", {
                            'ResultCode': 202,
                            'details': undefined,
                            'ResultText': "No Network found!"
                        });     return;
                    };
                    if (results1.length == 0) {

                        connection.query('UPDATE hau_acswitches SET ' + strString, strStringRes, function (error, results, fields) {
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
                            socket.emit("acswitches_postData", results.changedRows.toString());
                        });
                    } else {
                        connection.release();
                        socket.emit("showMessage", {
                            'ResultCode': 204,
                            'details': undefined,
                            'ResultText': "AC Already exist Please Try another name!"
                        });
                        return;
                    }
                });
            } else {
                data.ACSW_CREATEDDATE = commonMethods.GetDateToString(data.ACSW_CREATEDDATE);
                connection.query("SELECT * FROM hau_acswitches where (ACSW_ISDELETED  is null or ACSW_ISDELETED = 0)  and ACSW_AC_ID = " + data.ACSW_AC_ID + " and ACSW_SWIT_ID =" + data.ACSW_SWIT_ID + " ;", function (error1, results1, fields1) {
                if (error1) {        
                        socket.emit("Network Error", {
                        'ResultCode': 202,
                        'details': undefined,
                        'ResultText': "No Network found!"
                    });
                        return;
                    };
                    if (results1.length == 0) {

                        connection.query('INSERT INTO hau_acswitches SET ?', data, function (error, results, fields) {
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
                            socket.emit("acswitches_postData", results.insertId.toString());
                        });
                    } else {
                        connection.release();
                        socket.emit("showMessage", {
                            'ResultCode': 204,
                            'details': undefined,
                            'ResultText': "AC Already exist Please Try another name!"
                        });
                        return;
                    }
                });
            }
        });

    });


}