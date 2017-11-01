var commonMethods = require('./commonMethods')();
module.exports = function (app, pool) {
    app.get("/api/tubelightswitches/GetAll", function (req, res) {
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

                connection.query('SELECT * FROM hau_tubelightswitches;', function (error, results, fields) {
                    // And done with the connection.
                    connection.release();

                    // Handle error after the release.
                    if (err) {
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

    app.post("/api/tubelightswitches/GetAllByTubelightId", function (req, res) {
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

                connection.query('select ts.*,t.*,s.*,b.* from hau_tubelightswitches ts inner join hau_tubelights t on ts.TSWT_TUBE_ID = t.TUBE_ID inner join hau_switchs s on ts.TSWT_SWIT_ID = s.SWIT_ID inner join hau_boards b on s.SWIT_BORD_ID = b.BORD_ID  where (ts.TSWT_ISDELETED  is null or ts.TSWT_ISDELETED = 0) and ts.TSWT_TUBE_ID = ' + req.body.TSWT_TUBE_ID, function (error, results, fields) {
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

    app.get("/api/tubelightswitches/GetByID", function (req, res) {
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

                connection.query('SELECT * FROM hau_tubelightswitches where TWST_ID = ' + req.query['id'], function (error, results, fields) {
                    // And done with the connection.
                    connection.release();

                    // Handle error after the release.
                    if (err) {
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

    app.post("/api/tubelightswitches/postData", function (req, res) {
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
                if (req.body["TWST_ID"]) {
                    connection.query("SELECT * FROM hau_tubelightswitches where (TSWT_ISDELETED  is null or TSWT_ISDELETED = 0) and  TSWT_ID <>" + req.body.TSWT_ID + " and TSWT_TUBE_ID = " + req.body.TSWT_TUBE_ID + " and TSWT_SWIT_ID =" + req.body.TSWT_SWIT_ID + " ;", function (error1, results1, fields1) {
                        if (error1) {
                            res.send({
                                'ResultCode': 202,
                                'details': undefined,
                                'ResultText': "No Network found!"
                            });
                            return;
                        };
                        if (results1.length == 0) {
                            connection.query('UPDATE hau_tubelightswitches SET ' + strString, strStringRes, function (error, results, fields) {
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
                                'ResultText': "Tubelight Already exist Please Try another name!"
                            });
                            return;
                        }
                    });
                } else {
                    req.body.TSWT_CREATEDDATE = commonMethods.GetDateToString(req.body.TSWT_CREATEDDATE);
                    connection.query("SELECT * FROM hau_tubelightswitches where (TSWT_ISDELETED  is null or TSWT_ISDELETED = 0)  and TSWT_TUBE_ID = " + req.body.TSWT_TUBE_ID + " and TSWT_SWIT_ID =" + req.body.TSWT_SWIT_ID + " ;", function (error1, results1, fields1) {
                        if (error1) {
                            res.send({
                                'ResultCode': 202,
                                'details': undefined,
                                'ResultText': "No Network found!"
                            });
                            return;
                        };
                        if (results1.length == 0) {
                            connection.query('INSERT INTO hau_tubelightswitches SET ?', req.body, function (error, results, fields) {
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
                                'ResultText': "Tubelight Already exist Please Try another name!"
                            });
                            return;
                        }
                    });
                }
            });
        });
    });

}