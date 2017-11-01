var commonMethods = require('../controllers/commonMethods')();

module.exports = function (socket, pool, io) {
    socket.on("tubelightswitches_SelectAll", function (data) {
        pool.getConnection(function (err, connection) {
            // connected! (unless `err` is set)
            if (err) {
                socket.emit("Network Error", {
                    'ResultCode': 202,
                    'details': undefined,
                    'ResultText': "No Network found!"
                });
            return;};

            connection.query('SELECT * FROM hau_tubelightswitches;', function (error, results, fields) {
                // And done with the connection.
                connection.release();

                // Handle error after the release.
                if (error) {
                    socket.emit("Network Error", {
                        'ResultCode': 202,
                        'details': undefined,
                        'ResultText': "No Network found!"
                    });
            return;};

                // Don't use the connection here, it has been returned to the pool.
                // res.send({ 'ResultCode': 200, 'details': results, 'ResultText': "" });
                socket.emit("tubelightswitches_SelectAll",{ 'ResultCode': 200, 'details': results, 'ResultText': "" });
            });
        });


    });
    socket.on("tubelightswitches_GetAllByTubelightId", function (data) {
        pool.getConnection(function (err, connection) {
            // connected! (unless `err` is set)
            if (err) {
                socket.emit("Network Error", {
                    'ResultCode': 202,
                    'details': undefined,
                    'ResultText': "No Network found!"
                });
            return;};

            connection.query('select ts.*,t.*,s.*,b.* from hau_tubelightswitches ts inner join hau_tubelights t on ts.TSWT_TUBE_ID = t.TUBE_ID inner join hau_switchs s on ts.TSWT_SWIT_ID = s.SWIT_ID inner join hau_boards b on s.SWIT_BORD_ID = b.BORD_ID  where (ts.TSWT_ISDELETED  is null or ts.TSWT_ISDELETED = 0) and ts.TSWT_TUBE_ID = ' + data.TSWT_TUBE_ID, function (error, results, fields) {
                
                // And done with the connection.
                connection.release();

                // Handle error after the release.
                if (error) {
                    socket.emit("Network Error", {
                        'ResultCode': 202,
                        'details': undefined,
                        'ResultText': "No Network found!"
                    });
            return;};

                // Don't use the connection here, it has been returned to the pool.
            socket.emit("tubelightswitches_GetAllByTubelightId", { 'ResultCode': 200, 'details': results, 'ResultText': "" });
            });
        });

    });

    socket.on("tubelightswitches_GetByID", function (data) {
        pool.getConnection(function (err, connection) {
            // connected! (unless `err` is set)
            if (err) {
                socket.emit("Network Error", {
                    'ResultCode': 202,
                    'details': undefined,
                    'ResultText': "No Network found!"
                });
            return;};

            connection.query('SELECT * FROM hau_tubelightswitches where TWST_ID = ' + data['id'], function (error, results, fields) {
                // And done with the connection.
                connection.release();

                // Handle error after the release.
                if (error) {
                    socket.emit("Network Error", {
                        'ResultCode': 202,
                        'details': undefined,
                        'ResultText': "No Network found!"
                    });
            return;};

                // Don't use the connection here, it has been returned to the pool.
            socket.emit("tubelightswitches_GetByID", { 'ResultCode': 200, 'details': results, 'ResultText': "" });
            });
        });

    });

    socket.on("tubelightswitcheswitches_postData", function (data) {
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
            console.log(strString);
            if (data["TWST_ID"]) {
                connection.query("SELECT * FROM hau_tubelightswitches where (TSWT_ISDELETED  is null or TSWT_ISDELETED = 0) and  TSWT_ID <>" + data.TSWT_ID + " and TSWT_TUBE_ID = " + data.TSWT_TUBE_ID + " and TSWT_SWIT_ID =" + data.TSWT_SWIT_ID + " ;", function (error1, results1, fields1) {
                    if (error1) {
                        socket.emit("Network Error", {
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
                                socket.emit("Network Error", {
                                    'ResultCode': 202,
                                    'details': undefined,
                                    'ResultText': "No Network found!"
                                });
                                            return;
                            };

                            // Don't use the connection here, it has been returned to the pool.
                            io.to(socket.USER.homeid).emit("tubelightswitcheswitches_postData", data);
                        });
                    } else {
                        connection.release();
                        socket.emit("Network Error", {
                            'ResultCode': 202,
                            'details': undefined,
                            'ResultText': "No Network found!"
                        });
                            return;
                    }
                });
            } else {
                data.TSWT_CREATEDDATE = commonMethods.GetDateToString(data.TSWT_CREATEDDATE);
                connection.query("SELECT * FROM hau_tubelightswitches where (TSWT_ISDELETED  is null or TSWT_ISDELETED = 0)  and TSWT_TUBE_ID = " + data.TSWT_TUBE_ID + " and TSWT_SWIT_ID =" + data.TSWT_SWIT_ID + " ;", function (error1, results1, fields1) {
                    if (error1) {
                        socket.emit("Network Error", {
                            'ResultCode': 202,
                            'details': undefined,
                            'ResultText': "No Network found!"
                        });
                            return;
                    };
                    if (results1.length == 0) {
                        connection.query('INSERT INTO hau_tubelightswitches SET ?', data, function (error, results, fields) {
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
                            socket.emit("tubelightswitcheswitches_postData",{
                                'ResultCode': 200,
                                'details': results.insertId,
                                'ResultText': ""
                            });
                        });
                    } else {
                        connection.release();
                        socket.emit("showMessage",{
                            'ResultCode': 204,
                            'details': undefined,
                            'ResultText': "Tubelight Switch Already exist Please Try another name!"
                        });
                        return;
                    }
                });
            }
        });
    });


}