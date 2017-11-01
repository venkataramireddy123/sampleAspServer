var commonMethods = require('../controllers/commonMethods')();

module.exports = function (socket, pool, io) {
    socket.on("tvsextraswitches_GetAll", function (data) {
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

            connection.query('SELECT * FROM hau_tvsextraswitches;', function (error, results, fields) {
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
                socket.emit("tvsextraswitches_SelectAll", { 'ResultCode': 200, 'details': results, 'ResultText': "" });
            });
        });


    });
    socket.on("tvsextraswitches_GetByID", function (data) {
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

            connection.query('SELECT * FROM hau_tvsextraswitches where TVE_ID = ' + req.query['id'], function (error, results, fields) {
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
                socket.emit("tvsextraswitches_GetByID", { 'ResultCode': 200, 'details': results, 'ResultText': "" });
            });
        });

    });
    socket.on("tvsextraswitches_GetAllBytvId", function (data) {
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

            connection.query('select ts.*,t.* from hau_tvsextraswitches ts inner join hau_tvs t on ts.TVE_TV_ID = t.TV_ID  where (ts.TVE_ISDELETED  is null or ts.TVE_ISDELETED = 0) and ts.TVE_TV_ID = ' + req.body.TVE_TV_ID, function (error, results, fields) {
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
                socket.emit("tvsextraswitches_GetAllBytvId", {
                    'ResultCode': 200,
                    'details': results,
                    'ResultText': ""
                });
            });
        });
    });


    socket.on("tvsextraswitches_postData", function (data) {
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

            var strString = commonMethods.PopulatePropertiesForSocket(obj, "TVE_");
            var strStringRes = commonMethods.PopulatePropertiesResultsForSocket(obj, "TVE_");
            console.log(strString);
            if (data["TVE_ID"]) {
                connection.query("SELECT * FROM hau_tvsextraswitches where (TVE_ISDELETED  is null or TVE_ISDELETED = 0) and  TVE_ID <>" + req.body.TVE_ID + " and TVE_TV_ID = " + req.body.TVE_TV_ID + " and TVE_NAME ='" + req.body.TVE_NAME + "' ;", function (error1, results1, fields1) {
                    if (error1) {
                        res.send({
                            'ResultCode': 202,
                            'details': undefined,
                            'ResultText': "No Network found!"
                        });
                        return;
                    };
                    if (results1.length == 0) {

                        connection.query('UPDATE hau_tvsextraswitches SET ' + strString, strStringRes, function (error, results, fields) {
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
                            socket.emit("tvsextraswitches_postData", results.changedRows.toString());
                        });
                    } else {
                        connection.release();
                        socket.emit("showMessage", {
                            'ResultCode': 204,
                            'details': undefined,
                            'ResultText': "Tv Switche Already exist Please Try another name!"
                        });
                        return;
                    }
                });
            }
            else {
                req.body.TVE_CREATEDDATE = commonMethods.GetDateToString(req.body.TVE_CREATEDDATE);
                connection.query("SELECT * FROM hau_tvsextraswitches where (TVE_ISDELETED  is null or TVE_ISDELETED = 0)  and TVE_TV_ID = " + req.body.TVE_TV_ID + " and TVE_NAME ='" + req.body.TVE_NAME + "' ;", function (error1, results1, fields1) {
                    if (error1) {
                        res.send({
                            'ResultCode': 202,
                            'details': undefined,
                            'ResultText': "No Network found!"
                        });
                        return;
                    };
                    if (results1.length == 0) {

                        connection.query('INSERT INTO hau_tvsextraswitches SET ?', data, function (error, results, fields) {
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
                            // res.send({'ResultCode': 200,'details': results.insertId,'ResultText': ""});
                            socket.emit("tvsextraswitches_postData", results.insertId.toString());
                        });
                    } else {
                        connection.release();
                        socket.emit("showMessage", {
                            'ResultCode': 204,
                            'details': undefined,
                            'ResultText': "Tv Switche Already exist Please Try another name!"
                        });
                        return;
                    }
                });
            }
        });

    });


}