var commonMethods = require('../controllers/commonMethods')();

module.exports = function (socket, pool, io) {
    socket.on("userwiseboardaccess_GetAll", function (data) {
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

            connection.query('SELECT * FROM hau_userwiseboardaccess ub inner join hau_boards b on b.BORD_ID = ub.UWBA_BORD_ID inner join hau_rooms r on r.ROOM_ID = b.BORD_ROOM_ID where UWBA_USER_ID = ' + data.USER_ID + '  and r.ROOM_ISACTIVE = 1 and (r.ROOM_ISDELETED is null or r.ROOM_ISDELETED = 0) and (b.BORD_ISDELETED is null or b.BORD_ISDELETED = 0) order by r.ROOM_ID, b.BORD_ID;SELECT b.*,r.* FROM hau_boards b inner join hau_rooms r on r.ROOM_ID = b.BORD_ROOM_ID inner join hau_users u on u.USER_ENTT_ID = r.ROOM_ENTT_ID where r.ROOM_ISACTIVE = 1 and (r.ROOM_ISDELETED is null or r.ROOM_ISDELETED = 0) and (b.BORD_ISDELETED is null or b.BORD_ISDELETED = 0) and u.USER_ID = ' + data.USER_ID + ';', function (error, results, fields) {
                // And done with the connection.

                // Handle error after the release.
                if (error) {
                    socket.emit("Network Error", {
                        'ResultCode': 202,
                        'details': undefined,
                        'ResultText': "No Network found!"
                    });
                        return;
                };
                console.log(results);
                socket.emit("userwiseboardaccess_GetAll",{
                    'ResultCode': 200,
                    'details': results,
                    'ResultText': ""
                });

            });
        });

    });


    socket.on("userwiseboardaccess_postData", function (data) {
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
            if (obj.userwiseboardaccessData) {
                var itemsProcessed = 0;
                obj.userwiseboardaccessData.forEach((item, index, array) => {
                    asyncFunction(item, () => {
                        if (item.UWBA_ID) {
                            var strString = commonMethods.PopulateProperties(item);
                            var strStringRes = commonMethods.PopulatePropertiesResults(item);

                            connection.query('UPDATE hau_userwiseboardaccess SET ' + strString, strStringRes, function (error, results, fields) {
                                // And done with the connection.

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

                            });
                        }
                        else {
                            connection.query('INSERT INTO hau_acs SET ?', item, function (error, results, fields) {
                                // And done with the connection.

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

                            });
                        }
                        itemsProcessed++;
                        if (itemsProcessed === array.length) {
                            socket.emit("userwiseboardaccess_postData",{
                                'ResultCode': 200,
                                'details': results.changedRows,
                                'ResultText': ""
                            });
                        }
                    });
                });
            }

        });
    });

}