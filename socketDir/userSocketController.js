var commonMethods = require('../controllers/commonMethods')();

module.exports = function (socket, pool, io) {
    socket.on("users_GetAll", function (data) {
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
            connection.query('SELECT * FROM hau_users;', function (error, results, fields) {
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
                socket.emit("users_GetAll", { 'ResultCode': 200, 'details': results, 'ResultText': "" });
            });
        });


    });
    socket.on("users_GetAllByOrgId", function (data) {
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
            connection.query('SELECT u.*,e.* FROM hau_users u  inner join hau_roles e on e.ROLE_ID = u.USER_ROLE_ID  where (u.USER_ISDELETED is null or u.USER_ISDELETED =0)  and u.USER_ENTT_ID = ?', data.ENTT_ID, function (error, results, fields) {
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
                socket.emit("users_GetAllByOrgId", { 'ResultCode': 200, 'details': results, 'ResultText': "" });
            });
        });


    });

    socket.on("users_GetByID", function (data) {
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

            connection.query('SELECT * FROM hau_users where USER_ID = ' + data['id'], function (error, results, fields) {
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
                socket.emit("users_GetByID", { 'ResultCode': 200, 'details': results, 'ResultText': "" });
            });
        });

    });

    //Authenticate
    socket.on("users_Authenticate", function (data) {

        // app.post("/api/users/Authenticate",function(req, res){
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

            connection.query('SELECT * FROM hau_users where lower(USER_USERNAME) = lower(?) and USER_PASSWORD = ?;', [data.USER_USERNAME, data.USER_PASSWORD], function (error, results, fields) {
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
                socket.emit("users_Authenticate", { 'ResultCode': 200, 'details': results, 'ResultText': "" });

            });
        });

    });
    socket.on("users_logoff", function (data) {

        // app.post("/api/users/Authenticate",function(req, res){
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

            connection.query("update hau_logindata SET LOG_ISLOGEDOUT = 1 where LOG_TOK_ID = (select TOKN_ID from hau_token where TOKN_AUTHTOKEN = '" + data["token"] + "' limit 1 ) limit 1", function (error, results, fields) {
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
                socket.emit("users_logoff", { 'ResultCode': 200, 'details': results, 'ResultText': "" });

            });
        });

    });

    //ChangePassword
    socket.on("users_ChangePassword", function (data) {

        // app.post("/api/users/ChangePassword",function(req, res){
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
            var strString = commonMethods.PopulateProperties(obj);
            var strStringRes = commonMethods.PopulatePropertiesResults(obj);

            connection.query('UPDATE hau_users SET ' + strString, strStringRes, function (error, results, fields) {
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
                socket.emit("users_ChangePassword", { 'ResultCode': 200, 'details': results, 'ResultText': "" });
            });
        });

    });

    socket.on("users_postData", function (data) {
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

            var strString = commonMethods.PopulatePropertiesForSocket(obj, "USER_");
            var strStringRes = commonMethods.PopulatePropertiesResultsForSocket(obj, "USER_");
            console.log(strString);
            if (data["USER_ID"]) {
                connection.query("SELECT * FROM hau_users where (USER_ISDELETED is null or USER_ISDELETED =0) and lower(USER_USERNAME) = '" + data.USER_USERNAME.toLowerCase() + "' AND USER_ID	<>" + data.USER_ID + " and USER_ENTT_ID = " + parseInt(data.USER_ENTT_ID) + ";", function (error1, results1, fields1) {
                    if (error1) {

                        socket.emit("Network Error", {
                            'ResultCode': 202,
                            'details': undefined,
                            'ResultText': "No Network found!"
                        }); return;
                    };
                    if (results1.length == 0) {
                        connection.query('UPDATE hau_users SET ' + strString, strStringRes, function (error, results, fields) {
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
                            var obj = data;
                            if (obj.boards) {
                                var itemsProcessed = 0;
                                obj.boards.forEach((item, index, array) => {

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
                                        socket.emit("users_postData", {
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
                data.USER_CREATEDDATE = commonMethods.GetDateToString(data.USER_CREATEDDATE);
                connection.query("SELECT * FROM hau_users where (USER_ISDELETED is null or USER_ISDELETED =0) and lower(USER_USERNAME) = '" + data.USER_USERNAME.toLowerCase() + "' and USER_ENTT_ID = " + parseInt(data.USER_ENTT_ID) + ";", function (error1, results1, fields1) {
                    if (error1) {
                        res.send({
                            'ResultCode': 202,
                            'details': undefined,
                            'ResultText': "No Network found!"
                        });
                        return;
                    };
                    if (results1.length == 0) {

                        connection.query('INSERT INTO hau_users SET ?', data, function (error, results, fields) {
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
                            socket.emit("users_postData", results.insertId.toString());
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