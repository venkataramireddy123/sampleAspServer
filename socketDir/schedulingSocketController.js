var commonMethods = require('../controllers/commonMethods')();

module.exports = function (socket, pool, io) {
    socket.on("scheduling_SelectAll", function (data) {
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

            connection.query('SELECT * FROM hau_scheduling;', function (error, results, fields) {
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
                socket.emit("scheduling_SelectAll", { 'ResultCode': 200, 'details': results, 'ResultText': "" });
            });
        });

    });
    socket.on("scheduling_GetByID", function (data) {
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

            connection.query('SELECT * FROM hau_scheduling where TUSH_ID = ' + data['id'], function (error, results, fields) {
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
                socket.emit("scheduling_GetByID", { 'ResultCode': 200, 'details': results, 'ResultText': "" });
            });
        });

    });
    socket.on("scheduling_GetByAPPLID", function (data) {

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

            connection.query('SELECT * FROM hau_scheduling where (TUSH_ISDELETED  is null or TUSH_ISDELETED = 0) and (TUSH_FROMDATE < now() and TUSH_TODATE > now()) and TUSH_DEV_ID = ' + data['id'], function (error, results, fields) {
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
                socket.emit("scheduling_GetByAPPLID", { 'ResultCode': 200, 'details': results, 'ResultText': "" });
            });
        });

    });
    socket.on("scheduling_GetBySRID", function (data) {

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

            connection.query('SELECT * FROM hau_scheduling where (TUSH_ISDELETED  is null or TUSH_ISDELETED = 0) and (TUSH_FROMDATE < now() and TUSH_TODATE > now()) and TUSH_SR_ID = ' + data['id'], function (error, results, fields) {
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
                socket.emit("scheduling_GetBySRID", { 'ResultCode': 200, 'details': results, 'ResultText': "" });
            });
        });
    });
    socket.on("scheduling_GetBySWITCHID", function (data) {

        pool.getConnection(function (err, connection) {
            // connected! (unless `err` is set)
            if (err) {
                socket.emit("Network Error", {
                    'ResultCode': 202,
                    'details': undefined,
                    'ResultText': "No Network found!"
                }); return;
            };

            connection.query('SELECT * FROM hau_scheduling where (TUSH_ISDELETED  is null or TUSH_ISDELETED = 0) and (TUSH_FROMDATE < now() and TUSH_TODATE > now()) and TUSH_SWIT_ID = ' + data['id'], function (error, results, fields) {
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
                socket.emit("scheduling_GetBySWITCHID", { 'ResultCode': 200, 'details': results, 'ResultText': "" });
            });
        });
    });
    socket.on("scheduling_GetAllDropdownsByOrgId", function (data) {
        pool.getConnection(function (err, connection) {
            // connected! (unless `err` is set)
            if (err) {
                socket.emit("Network Error", {
                    'ResultCode': 202,
                    'details': undefined,
                    'ResultText': "No Network found!"
                }); return;
            };

            connection.query('select * from hau_sensors s inner join hau_boards b on b.BORD_ID = s.SR_BORD_ID inner join hau_rooms r on r.ROOM_ID = b.BORD_ROOM_ID where (s.SR_ISDELETED  is null or s.SR_ISDELETED = 0) AND (b.BORD_ISDELETED is null or b.BORD_ISDELETED = 0) AND (r.ROOM_ISDELETED is null or r.ROOM_ISDELETED = 0) AND r.ROOM_ENTT_ID =' + data['id'] + ';select * from hau_appliances a inner join hau_appliancestype t on a.APPL_TYPE = t.APTY_ID inner join hau_boards b on b.BORD_ID = a.APPL_BORD_ID inner join hau_rooms r on r.ROOM_ID = b.BORD_ROOM_ID where r.ROOM_ENTT_ID = ' + data['id'] + ';select * from hau_switchs s inner join hau_switchtypes t on t.SWTY_ID = s.SWIT_SWTY_ID inner join hau_boards b on b.BORD_ID = s.SWIT_BORD_ID inner join hau_rooms r on r.ROOM_ID = b.BORD_ROOM_ID where r.ROOM_ENTT_ID =' + data['id'] + ";", function (error, results, fields) {
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
                socket.emit("scheduling_GetAllDropdownsByOrgId", { 'ResultCode': 200, 'details': results, 'ResultText': "" });
            });
        });
    });
    socket.on("scheduling_postData", function (data) {

        pool.getConnection(function (err, connection) {
            // connected! (unless `err` is set)
            if (err) { res.send({ 'ResultCode': 202, 'details': undefined, 'ResultText': "No Network found!" }); return; };
            var obj = data;

            var strString = commonMethods.PopulateProperties(obj);
            var strStringRes = commonMethods.PopulatePropertiesResults(obj);
            console.log(strString);
            if (data["TUSH_ID"]) {
                connection.query('UPDATE hau_scheduling SET ' + strString, strStringRes, function (error, results, fields) {
                    // And done with the connection.
                    connection.release();

                    // Handle error after the release.
                    if (error) { res.send({ 'ResultCode': 202, 'details': undefined, 'ResultText': "No Network found!" }); return; };

                    // Don't use the connection here, it has been returned to the pool.
                    res.send({ 'ResultCode': 200, 'details': results.changedRows, 'ResultText': "" });
                });
            }
            else {
                data.TUSH_FROMDATE = commonMethods.GetDateToString(data.TUSH_FROMDATE);
                data.TUSH_TODATE = commonMethods.GetDateToString(data.TUSH_TODATE);
                data.TUSH_CREATEDDATE = commonMethods.GetDateToString(data.TUSH_CREATEDDATE);

                connection.query('INSERT INTO hau_scheduling SET ?', data, function (error, results, fields) {
                    // And done with the connection.

                    // connection.release();

                    // Handle error after the release.
                    if (error) { res.send({ 'ResultCode': 202, 'details': undefined, 'ResultText': "No Network found!" }); return; };

                    // Don't use the connection here, it has been returned to the pool.
                    res.send({ 'ResultCode': 200, 'details': results.insertId, 'ResultText': "" });
                });
            }
        });
    });

    // socket.on("scheduling_postData", function (data) {
    //     pool.getConnection(function (err, connection) {
    //         // connected! (unless `err` is set)
    //         if (err) {
    //             socket.emit("Network Error", {
    //                 'ResultCode': 202,
    //                 'details': undefined,
    //                 'ResultText': "No Network found!"
    //             });
    //             return;
    //         };
    //         var obj = data;

    //         var strString = commonMethods.PopulateProperties(obj);
    //         var strStringRes = commonMethods.PopulatePropertiesResults(obj);
    //         console.log(strString);
    //         if (data["TUSH_ID"]) {
    //             connection.query('UPDATE hau_scheduling SET ' + strString, strStringRes, function (error, results, fields) {
    //                 // And done with the connection.
    //                 connection.release();

    //                 // Handle error after the release.
    //                 if (error) {
    //                     socket.emit("Network Error", {
    //                         'ResultCode': 202,
    //                         'details': undefined,
    //                         'ResultText': "No Network found!"
    //                     });
    //                     return;
    //                 };

    //                 // Don't use the connection here, it has been returned to the pool.
    //                 // res.send({'ResultCode': 200,'details': results.changedRows,'ResultText': ""});
    //                 socket.emit("scheduling_postData", results.changedRows.toString());
    //             });
    //         }
    //         else {
    //             connection.query('INSERT INTO hau_scheduling SET ?', data, function (error, results, fields) {
    //                 // And done with the connection.
    //                 connection.release();

    //                 // Handle error after the release.
    //                 if (error) {
    //                     socket.emit("Network Error", {
    //                         'ResultCode': 202,
    //                         'details': undefined,
    //                         'ResultText': "No Network found!"
    //                     });
    //                     return;
    //                 };

    //                 // Don't use the connection here, it has been returned to the pool.
    //                 // res.send({'ResultCode': 200,'details': results.insertId,'ResultText': ""});
    //                 socket.emit("scheduling_postData", results.insertId.toString());
    //             });
    //         }
    //     });

    // });


}