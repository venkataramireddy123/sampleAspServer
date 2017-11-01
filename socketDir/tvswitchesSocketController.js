var commonMethods = require('../controllers/commonMethods')();

module.exports = function (socket, pool, io) {
    socket.on("tvs_GetAll", function (data) {
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

            connection.query('SELECT * FROM hau_tvswitches;', function (error, results, fields) {
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
                socket.emit("tvs_GetAll", {
                    'ResultCode': 200,
                    'details': results,
                    'ResultText': ""
                });
            });
        });
    });

    socket.on("tvswitches_GetAllBytvId", function (data) {

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

            connection.query('select ts.*,t.*,s.*,b.*,r.* from hau_tvswitches ts inner join hau_tvs t on ts.TVSW_TV_ID = t.TV_ID inner join hau_switchs s on ts.TVSW_SWIT_ID = s.SWIT_ID inner join hau_boards b on s.SWIT_BORD_ID = b.BORD_ID inner join hau_rooms r on b.BORD_ROOM_ID = r.ROOM_ID where (ts.TVSW_ISDELETED  is null or ts.TVSW_ISDELETED = 0) and ts.TVSW_TV_ID = ' + data.TVSW_TV_ID, function (error, results, fields) {
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
                socket.emit("tvswitches_GetAllBytvId", {
                    'ResultCode': 200,
                    'details': results,
                    'ResultText': ""
                });
            });
        });
    });

    socket.on("tvswitches_GetByID", function (data) {

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

            connection.query('SELECT * FROM hau_tvswitches where TVSW_ID = ' + data['id'], function (error, results, fields) {
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
                socket.emit("tvswitches_GetByID", {
                    'ResultCode': 200,
                    'details': results,
                    'ResultText': ""
                });
            });
        });
    });

    socket.on("tvswitches_postData", function (data) {
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

            var strString = commonMethods.PopulatePropertiesForSocket(obj, "TVSW_");
            var strStringRes = commonMethods.PopulatePropertiesResultsForSocket(obj, "TVSW_");
            console.log(strString);
            if (data["TVSW_ID"]) {
                connection.query("SELECT * FROM hau_tvswitches where (TVSW_ISDELETED  is null or TVSW_ISDELETED = 0) and  TVSW_ID <>" + data.TVSW_ID + " and TVSW_TV_ID = " + data.TVSW_TV_ID + " and TVSW_SWIT_ID =" + data.TVSW_SWIT_ID + " ;", function (error1, results1, fields1) {
                    if (error1) {
                        socket.emit("Network Error", {
                            'ResultCode': 202,
                            'details': undefined,
                            'ResultText': "No Network found!"
                        });
                        return;
                    };
                    if (results1.length == 0) {
                        connection.query('UPDATE hau_tvswitches SET ' + strString, strStringRes, function (error, results, fields) {
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
                            socket.emit("tvswitches_postData", {
                                'ResultCode': 200,
                                'details': data,
                                'ResultText': ""
                            });
                        });
                    } else {
                        connection.release();
                        socket.emit("showMessage", {
                            'ResultCode': 204,
                            'details': undefined,
                            'ResultText': "tv Already exist Please Try another name!"
                        });
                        return;
                    }
                });
            } else {
                data.TVSW_CREATEDDATE = commonMethods.GetDateToString(data.TVSW_CREATEDDATE);
                connection.query("SELECT * FROM hau_tvswitches where (TVSW_ISDELETED  is null or TVSW_ISDELETED = 0)  and TVSW_TV_ID = " + data.TVSW_TV_ID + " and TVSW_SWIT_ID =" + data.TVSW_SWIT_ID + " ;", function (error1, results1, fields1) {
                    if (error1) {
                        socket.emit("Network Error", {
                            'ResultCode': 202,
                            'details': undefined,
                            'ResultText': "No Network found!"
                        });
                        return;
                    };
                    if (results1.length == 0) {
                        connection.query('INSERT INTO hau_tvswitches SET ?', data, function (error, results, fields) {
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
                            socket.emit("tvswitches_postData", {
                                'ResultCode': 200,
                                'details': results.insertId,
                                'ResultText': ""
                            });
                        });
                    } else {
                        connection.release();
                        socket.emit("showMessage", {
                            'ResultCode': 204,
                            'details': undefined,
                            'ResultText': "tv Already exist Please Try another name!"
                        });
                        return;
                    }
                });
            }
        });
    });
}