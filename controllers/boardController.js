var commonMethods = require('./commonMethods')();
module.exports = function (app, pool) {
    app.get("/api/boards/GetAll", function (req, res) {
        commonMethods.parseToken(pool, req, res, function () {
            pool.getConnection(function (err, connection) {
                // connected! (unless `err` is set)
                if (err) {
                    res.send({
                        'ResultCode': 202,
                        'details': undefined,
                        'ResultText': "No Network found!"
                    });
                    return;
                };
                connection.query('SELECT * FROM hau_boards;', function (error, results, fields) {
                    // And done with the connection.
                    connection.release();

                    // Handle error after the release.
                    if (error) {
                        res.send({
                            'ResultCode': 202,
                            'details': undefined,
                            'ResultText': "No Network found!"
                        });
                        return;
                    };

                    // Don't use the connection here, it has been returned to the pool.
                    res.send({
                        'ResultCode': 200,
                        'details': results,
                        'ResultText': ""
                    });
                });
            });
        });

    });

    app.get("/api/boards/GetByID", function (req, res) {
        commonMethods.parseToken(pool, req, res, function () {
            pool.getConnection(function (err, connection) {
                // connected! (unless `err` is set)
                if (err) {
                    res.send({
                        'ResultCode': 202,
                        'details': undefined,
                        'ResultText': "No Network found!"
                    });
                    return;
                };

                connection.query('SELECT * FROM hau_boards where BORD_ID = ' + req.query['id'], function (error, results, fields) {
                    // And done with the connection.
                    connection.release();

                    // Handle error after the release.
                    if (error) {
                        res.send({
                            'ResultCode': 202,
                            'details': undefined,
                            'ResultText': "No Network found!"
                        });
                        return;
                    };

                    // Don't use the connection here, it has been returned to the pool.
                    res.send({
                        'ResultCode': 200,
                        'details': results,
                        'ResultText': ""
                    });
                });
            });
        });

    });
    app.post("/api/boards/GetAllByRoomId", function (req, res) {
        commonMethods.parseToken(pool, req, res, function () {
            pool.getConnection(function (err, connection) {
                // connected! (unless `err` is set)
                if (err) {
                    res.send({
                        'ResultCode': 202,
                        'details': undefined,
                        'ResultText': "No Network found!"
                    });
                    return;
                };

                connection.query('SELECT * FROM hau_boards where (BORD_ISDELETED is null or BORD_ISDELETED = 0) and BORD_ROOM_ID = ' + req.body.BORD_ROOM_ID, function (error, results, fields) {
                    // And done with the connection.
                    connection.release();

                    // Handle error after the release.
                    if (error) {
                        res.send({
                            'ResultCode': 202,
                            'details': undefined,
                            'ResultText': "No Network found!"
                        });
                        return;
                    };

                    // Don't use the connection here, it has been returned to the pool.
                    res.send({
                        'ResultCode': 200,
                        'details': results,
                        'ResultText': ""
                    });
                });
            });

        });
    });

    app.post("/api/boards/postData", function (req, res) {
        commonMethods.parseToken(pool, req, res, function () {
            pool.getConnection(function (err, connection) {
                // connected! (unless `err` is set)
                if (err) {
                    res.send({
                        'ResultCode': 202,
                        'details': undefined,
                        'ResultText': "No Network found!"
                    });
                    return;
                };

                var obj = req.body;

                var strString = commonMethods.PopulateProperties(obj);
                var strStringRes = commonMethods.PopulatePropertiesResults(obj);
                console.log(strString);
                if (req.body["BORD_ID"]) {
                    connection.query("select * from hau_boards where BORD_ID <>" + req.body.BORD_ID + " and lower(BORD_NAME) = lower('" + req.body.BORD_NAME + "') and (BORD_ISDELETED is null or BORD_ISDELETED = 0) and BORD_ROOM_ID =" + req.body.BORD_ROOM_ID + " ;", function (error1, results1, fields1) {
                        if (error1) {
                            res.send({
                                'ResultCode': 202,
                                'details': undefined,
                                'ResultText': "No Network found!"
                            });
                            return;
                        };
                        if (results1.length == 0) {
                            connection.query('UPDATE hau_boards SET ' + strString, strStringRes, function (error, results, fields) {
                                // And done with the connection.
                                connection.release();

                                // Handle error after the release.
                                if (error) {
                                    res.send({
                                        'ResultCode': 202,
                                        'details': undefined,
                                        'ResultText': "No Network found!"
                                    });
                                    return;
                                };

                                // Don't use the connection here, it has been returned to the pool.
                                res.send({
                                    'ResultCode': 200,
                                    'details': results.changedRows,
                                    'ResultText': ""
                                });
                            });
                        } else {
                            connection.release();
                            res.send({
                                'ResultCode': 204,
                                'details': undefined,
                                'ResultText': "Board Already exist Please Try another name!"
                            });
                            return;
                        }
                    });
                } else {
                    req.body.BORD_CREATEDDATE = commonMethods.GetDateToString(req.body.BORD_CREATEDDATE);
                    connection.query("select * from hau_boards where lower(BORD_NAME) = lower('" + req.body.BORD_NAME + "') and (BORD_ISDELETED is null or BORD_ISDELETED = 0) and BORD_ROOM_ID =" + req.body.BORD_ROOM_ID + " ;", function (error1, results1, fields1) {
                        if (error1) {
                            res.send({
                                'ResultCode': 202,
                                'details': undefined,
                                'ResultText': "No Network found!"
                            });
                            return;
                        };
                        if (results1.length == 0) {
                            connection.query('INSERT INTO hau_boards SET ?', req.body, function (error, results, fields) {
                                // And done with the connection.
                                connection.release();

                                // Handle error after the release.
                                if (error) {
                                    res.send({
                                        'ResultCode': 202,
                                        'details': undefined,
                                        'ResultText': "No Network found!"
                                    });
                                    return;
                                };

                                // Don't use the connection here, it has been returned to the pool.
                                res.send({
                                    'ResultCode': 200,
                                    'details': results.insertId,
                                    'ResultText': ""
                                });
                            });
                        } else {
                            connection.release();
                            res.send({
                                'ResultCode': 204,
                                'details': undefined,
                                'ResultText': "Board Already exist Please Try another name!"
                            });
                            return;
                        }
                    });
                }
            });
        });
    });

}