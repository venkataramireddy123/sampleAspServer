var commonMethods = require('./commonMethods')();
var userwiseboardaccessController = require('./userwiseboardaccessController');
module.exports = function (app, pool) {
    app.get("/api/users/GetAll", function (req, res) {
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

            connection.query('SELECT * FROM hau_users;', function (error, results, fields) {
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

    app.post("/api/users/GetAllByOrgId", function (req, res) {
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

                connection.query('SELECT u.*,e.* FROM hau_users u  inner join hau_roles e on e.ROLE_ID = u.USER_ROLE_ID  where (u.USER_ISDELETED is null or u.USER_ISDELETED =0)  and u.USER_ENTT_ID = ?', req.body.ENTT_ID, function (error, results, fields) {
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

    app.get("/api/users/GetByID", function (req, res) {
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

            connection.query('SELECT * FROM hau_users where USER_ID = ' + req.query['id'], function (error, results, fields) {
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

    //Authenticate
    app.post("/api/users/Authenticate", function (req, res) {
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
            connection.query("call sp_validateuser('" + req.body.homeid + "','" + req.body.USER_USERNAME + "','" + req.body.USER_PASSWORD + "')", function (error, results, fields) {
                if (error) {
                    //throw error;
                    res.send({
                        'ResultCode': 202,
                        'details': undefined,
                        'ResultText': "No Network found!"
                    });
                    connection.release();
                    return;
                }
                if (results[0] != undefined) {
                    var token = results[0][0].USER_ID + ";;;" + results[0][0].USER_USERNAME + ";;;" + results[0][0].USER_ROLE_ID + ";;;" + results[0][0].USER_ENTT_ID + ";;;" + req.body.homeid + ";;;" + new Date();
                    token = commonMethods.encrypt(token);
                    var _token = commonMethods.decrypt(token);
                    var date = new Date();
                    var creDate = new Date();
                    var obj = {
                        "TOKN_USER_ID": results[0][0].USER_ID,
                        "TOKN_AUTHTOKEN": token,
                        "TOKN_ISSUEDON": creDate,
                        "TOKN_EXPIRESON": (new Date(date.setTime(date.getTime() + 1 * 86400000))),
                        "TOKN_CREATEDDATE": creDate,
                        "TOKN_MODIFIEDDATE": creDate
                    }
                    connection.query("INSERT INTO hau_token SET ?", obj, function (error1, results1, fields1) {
                        // And done with the connection.
                        connection.release();

                        // Handle error after the release.
                        if (error1) {
                            res.send({
                                'ResultCode': 202,
                                'details': undefined,
                                'ResultText': "No Network found!"
                            });
                            return;
                        };
                        results[0][0].token = token;
                        var result = {
                            'ResultCode': 200,
                            'details': results,
                            'ResultText': ""
                        };
                        res.send(result);

                    });

                } else {
                    var result = {
                        'ResultCode': 200,
                        'details': results[0],
                        'ResultText': ""
                    };
                    connection.release();
                    res.send(result);
                }
            });
        });

    });

    //lOGED_OUT
    app.post("/api/users/logoff", function (req, res) {
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
            // var obj = req.body;
            // var strString = commonMethods.PopulateProperties(obj);
            // var strStringRes = commonMethods.PopulatePropertiesResults(obj);

            connection.query("update hau_logindata SET LOG_ISLOGEDOUT = 1 where LOG_TOK_ID = (select TOKN_ID from hau_token where TOKN_AUTHTOKEN = '" + req.headers["token"] + "' limit 1 ) limit 1", function (error, results, fields) {
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


    //ChangePassword
    app.post("/api/users/ChangePassword", function (req, res) {
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

            connection.query('UPDATE hau_users SET ' + strString, strStringRes, function (error, results, fields) {
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


    app.post("/api/users/postData", function (req, res) {
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

            var strString = commonMethods.PopulatePropertiesForSocket(obj, "USER_");
            var strStringRes = commonMethods.PopulatePropertiesResultsForSocket(obj, "USER_");
            console.log(strString);
            if (req.body["USER_ID"]) {
                connection.query("SELECT * FROM hau_users where (USER_ISDELETED is null or USER_ISDELETED =0) and lower(USER_USERNAME) = '" + req.body.USER_USERNAME.toLowerCase() + "' AND USER_ID	<>" + req.body.USER_ID + " and USER_ENTT_ID = " + parseInt(req.body.USER_ENTT_ID) + ";", function (error1, results1, fields1) {
                    if (error1) {
                        res.send({
                            'ResultCode': 202,
                            'details': undefined,
                            'ResultText': "No Network found!"
                        });
                        return;
                    };
                    if (results1.length == 0) {
                        connection.query('UPDATE hau_users SET ' + strString, strStringRes, function (error, results, fields) {
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
                            var obj = req.body;
                            if (obj.boards) {
                                var itemsProcessed = 0;
                                obj.boards.forEach((item, index, array) => {

                                    if (!item.UWBA_USER_ID)
                                        item.UWBA_USER_ID = obj.USER_MODIFIEDBY;
                                    if (item.UWBA_ID) {
                                        var strString = commonMethods.PopulatePropertiesForSocket(item, "UWBA_");
                                        var strStringRes = commonMethods.PopulatePropertiesResultsForSocket(item, "UWBA_");
                                        console.log(strString);
                                        console.log(strStringRes);

                                        connection.query('UPDATE hau_userwiseboardaccess SET ' + strString, strStringRes, function (error, results, fields) {
                                            // And done with the connection.

                                            // Handle error after the release.
                                            if (error) {
                                                debugger;
                                            };

                                            // Don't use the connection here, it has been returned to the pool.

                                        });
                                    } else {

                                        var dataForHistory = commonMethods.PopulatePropertiesForUserAccess(item, 'UWBA_', 'UWBA_');

                                        connection.query('INSERT INTO hau_userwiseboardaccess SET ?', dataForHistory, function (error, results, fields) {
                                            // And done with the connection.

                                            // Handle error after the release.
                                            if (error) {
                                                debugger;
                                                //res.send({
                                                //    'ResultCode': 202,
                                                //    'details': undefined,
                                                //    'ResultText': "No Network found!"
                                                //});
                                                //return;
                                            };

                                            // Don't use the connection here, it has been returned to the pool.

                                        });
                                    }
                                    itemsProcessed++;
                                    if (itemsProcessed === array.length) {
                                        res.send({
                                            'ResultCode': 200,
                                            'details': results.changedRows,
                                            'ResultText': ""
                                        });
                                    }

                                });
                            }




                            // Don't use the connection here, it has been returned to the pool.
                            //res.send({
                            //    'ResultCode': 200,
                            //    'details': results.changedRows,
                            //    'ResultText': ""
                            //});

                        });
                    } else {
                        connection.release();
                        res.send({
                            'ResultCode': 204,
                            'details': undefined,
                            'ResultText': "User Already exist Please Try another name!"
                        });
                        return;
                    }
                });
            } else {
                req.body.USER_CREATEDDATE = commonMethods.GetDateToString(req.body.USER_CREATEDDATE);
                connection.query("SELECT * FROM hau_users where (USER_ISDELETED is null or USER_ISDELETED =0) and lower(USER_USERNAME) = '" + req.body.USER_USERNAME.toLowerCase() + "' and USER_ENTT_ID = " + parseInt(req.body.USER_ENTT_ID) + ";", function (error1, results1, fields1) {
                    if (error1) {
                        res.send({
                            'ResultCode': 202,
                            'details': undefined,
                            'ResultText': "No Network found!"
                        });
                        return;
                    };
                    if (results1.length == 0) {
                        var obj = req.body;
                        var withOutBoards = obj;
                        delete withOutBoards.boards;
                        connection.query('INSERT INTO hau_users SET ?', withOutBoards, function (error, results, fields) {
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
                            // res.send({
                            //     'ResultCode': 200,
                            //     'details': results.insertId,
                            //     'ResultText': ""
                            // });
                            if (obj.boards) {
                                var itemsProcessed = 0;
                                obj.boards.forEach((item, index, array) => {

                                    if (!item.UWBA_USER_ID)
                                        item.UWBA_USER_ID = obj.USER_MODIFIEDBY;
                                    if (item.UWBA_ID) {
                                        var strString = commonMethods.PopulatePropertiesForSocket(item, "UWBA_");
                                        var strStringRes = commonMethods.PopulatePropertiesResultsForSocket(item, "UWBA_");
                                        console.log(strString);
                                        console.log(strStringRes);

                                        connection.query('UPDATE hau_userwiseboardaccess SET ' + strString, strStringRes, function (error, results, fields) {
                                            // And done with the connection.

                                            // Handle error after the release.
                                            if (error) {
                                                debugger;
                                            };

                                            // Don't use the connection here, it has been returned to the pool.

                                        });
                                    } else {
                                        var dataForHistory = commonMethods.PopulatePropertiesForUserAccess(item, 'UWBA_', 'UWBA_');

                                        connection.query('INSERT INTO hau_userwiseboardaccess SET ?', dataForHistory, function (error, results, fields) {
                                            // And done with the connection.

                                            // Handle error after the release.
                                            if (error) {
                                                debugger;
                                                //res.send({
                                                //    'ResultCode': 202,
                                                //    'details': undefined,
                                                //    'ResultText': "No Network found!"
                                                //});
                                                //return;
                                            };

                                            // Don't use the connection here, it has been returned to the pool.

                                        });
                                    }
                                    itemsProcessed++;
                                    if (itemsProcessed === array.length) {
                                        res.send({
                                            'ResultCode': 200,
                                            'details': results.changedRows,
                                            'ResultText': ""
                                        });
                                    }

                                });
                            }
                            else {
                                res.send({
                                    'ResultCode': 200,
                                    'details': results.insertId,
                                    'ResultText': ""
                                });
                            }
                        });
                    } else {
                        connection.release();
                        res.send({
                            'ResultCode': 204,
                            'details': undefined,
                            'ResultText': "User Already exist Please Try another name!"
                        });
                        return;
                    }
                });
            }
        });
    });


}