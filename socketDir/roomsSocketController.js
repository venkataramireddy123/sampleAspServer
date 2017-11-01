var commonMethods = require('../controllers/commonMethods')();

module.exports = function (socket, pool, io) {
    socket.on("rooms_GetAll", function (data) {
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

            connection.query('SELECT * FROM hau_rooms;', function (error, results, fields) {
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
                socket.emit("rooms_GetAll", { 'ResultCode': 200, 'details': results, 'ResultText': "" });
            });
        });

    });
    socket.on("rooms_GetAllByOrgId", function (data) {
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

            connection.query('SELECT r.*,t.* FROM hau_rooms r inner join hau_roomtypes t on r.ROOM_ROTY_ID = t.ROTY_ID where (ROOM_ISDELETED is null or ROOM_ISDELETED = 0) and ROOM_ISACTIVE =1 AND ROOM_ENTT_ID = ?', data.ENTT_ID, function (error, results, fields) {
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
                socket.emit("rooms_GetAllByOrgId", { 'ResultCode': 200, 'details': results, 'ResultText': "" });
            });
        });

    });

    socket.on("rooms_GetByID", function (data) {
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

            connection.query('SELECT * FROM hau_rooms where ROOM_ID = ' + data['id'], function (error, results, fields) {
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
                socket.emit("rooms_GetByID", { 'ResultCode': 200, 'details': results, 'ResultText': "" });
            });
        });

    });

    socket.on("rooms_postData", function (data) {
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

            var strString = commonMethods.PopulatePropertiesForSocket(obj, "ROOM_");
            var strStringRes = commonMethods.PopulatePropertiesResultsForSocket(obj, "ROOM_");
            console.log(strString);
            if (data["ROOM_ID"]) {
                connection.query("select * from hau_rooms where ROOM_ID <>" + data.ROOM_ID + " and lower(ROOM_NAME) = lower('" + data.ROOM_NAME + "') and (ROOM_ISDELETED is null or ROOM_ISDELETED = 0) and ROOM_ENTT_ID =" + data.ROOM_ENTT_ID + " ;", function (error1, results1, fields1) {
                    if (error1) {
                        res.send({
                            'ResultCode': 202,
                            'details': undefined,
                            'ResultText': "No Network found!"
                        });
                        return;
                    };
                    if (results1.length == 0) {

                        connection.query('UPDATE hau_rooms SET ' + strString, strStringRes, function (error, results, fields) {
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
                            socket.emit("rooms_postData", results.changedRows.toString());
                        });
                    } else {
                        connection.release();
                        res.send({
                            'ResultCode': 204,
                            'details': undefined,
                            'ResultText': "Room Already exist Please Try another name!"
                        });
                        return;
                    }
                });
            } else {
                data.ROOM_CREATEDDATE = commonMethods.GetDateToString(data.ROOM_CREATEDDATE);
                connection.query("select * from hau_rooms where  lower(ROOM_NAME) = lower('" + data.ROOM_NAME + "') and (ROOM_ISDELETED is null or ROOM_ISDELETED = 0) and ROOM_ENTT_ID =" + data.ROOM_ENTT_ID + " ;", function (error1, results1, fields1) {
                    if (error1) {
                        res.send({
                            'ResultCode': 202,
                            'details': undefined,
                            'ResultText': "No Network found!"
                        });
                        return;
                    };
                    if (results1.length == 0) {

                        connection.query('INSERT INTO hau_rooms SET ?', data, function (error, results, fields) {
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
                            socket.emit("rooms_postData", results.insertId.toString());
                        });
                    } else {
                        connection.release();
                        res.send({
                            'ResultCode': 204,
                            'details': undefined,
                            'ResultText': "Room Already exist Please Try another name!"
                        });
                        return;
                    }
                });
            }
        });
    });
    socket.on("rooms_GetAllByOrgIdForUsersOnlyroomNames", function (data) {
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

            var que = "SELECT * FROM hau_rooms r inner join hau_roomtypes t on r.ROOM_ROTY_ID = t.ROTY_ID inner join hau_entities on ENTT_ID = r.ROOM_ENTT_ID where (ROOM_ISDELETED is null or ROOM_ISDELETED = 0) and ROOM_ISACTIVE =1 AND ENTT_IDENTITY = '" + data.ENTT_IDENTITY + "';";
            connection.query(que, function (error, results, fields) {
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
                socket.emit("rooms_GetAllByOrgIdForUsersOnlyroomNames", { 'ResultCode': 200, 'details': results, 'ResultText': "" });
            });
        });

    });

    socket.on("rooms_GetAllByOrgIdForUsers", function (data) {
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

            var que = "SELECT * FROM hau_rooms r inner join hau_roomtypes t on r.ROOM_ROTY_ID = t.ROTY_ID inner join hau_entities on ENTT_ID = r.ROOM_ENTT_ID where (ROOM_ISDELETED is null or ROOM_ISDELETED = 0) and ROOM_ISACTIVE =1 AND ENTT_IDENTITY = '" + data.ENTT_IDENTITY + "' and ROOM_ID='" + data.ROOM_ID + "';SELECT hau_boards.*,hau_rooms.* FROM hau_boards inner join hau_rooms on BORD_ROOM_ID = ROOM_ID inner join hau_entities on ENTT_ID = ROOM_ENTT_ID where (BORD_ISDELETED is null or BORD_ISDELETED = 0) and ENTT_IDENTITY = '" + data.ENTT_IDENTITY + "' and ROOM_ID='" + data.ROOM_ID + "';SELECT * FROM hau_switchs inner join hau_boards on SWIT_BORD_ID = BORD_ID inner join hau_rooms on BORD_ROOM_ID = ROOM_ID inner join hau_entities on ENTT_ID = ROOM_ENTT_ID  where (SWIT_ISDELETED  is null or SWIT_ISDELETED = 0) and ENTT_IDENTITY = '" + data.ENTT_IDENTITY + "' and ROOM_ID='" + data.ROOM_ID + "';SELECT hau_sensors.*,hau_boards.*,hau_rooms.* FROM hau_sensors inner join hau_boards on SR_BORD_ID = BORD_ID inner join hau_rooms on BORD_ROOM_ID = ROOM_ID inner join hau_entities on ENTT_ID = ROOM_ENTT_ID where (SR_ISDELETED  is null or SR_ISDELETED = 0) and ENTT_IDENTITY = '" + data.ENTT_IDENTITY + "' and ROOM_ID='" + data.ROOM_ID + "';SELECT hau_fans.*,hau_boards.*,hau_rooms.* FROM hau_fans inner join hau_boards on FAN_BORD_ID = BORD_ID inner join hau_rooms on BORD_ROOM_ID = ROOM_ID inner join hau_entities on ENTT_ID = ROOM_ENTT_ID where (FAN_ISDELETED  is null or FAN_ISDELETED = 0) and ENTT_IDENTITY = '" + data.ENTT_IDENTITY + "' and ROOM_ID='" + data.ROOM_ID + "';select fs.*,f.*,s.*,b.*,r.* from hau_fanswitches fs inner join hau_fans f on fs.FSWT_FAN_ID = f.FAN_ID inner join hau_switchs s on fs.FSWT_SWIT_ID = s.SWIT_ID inner join hau_boards b on s.SWIT_BORD_ID = b.BORD_ID inner join hau_rooms r on b.BORD_ROOM_ID = r.ROOM_ID inner join hau_entities on ENTT_ID = r.ROOM_ENTT_ID  where (fs.FSWT_ISDELETED  is null or fs.FSWT_ISDELETED = 0) AND ENTT_IDENTITY = '" + data.ENTT_IDENTITY + "' and ROOM_ID='" + data.ROOM_ID + "';SELECT hau_lights.*,hau_boards.*,hau_rooms.* FROM hau_lights  inner join hau_boards on LIGH_BORD_ID = BORD_ID inner join hau_rooms on BORD_ROOM_ID = ROOM_ID inner join hau_entities on ENTT_ID = ROOM_ENTT_ID   where (LIGH_ISDELETED  is null or LIGH_ISDELETED = 0) and ENTT_IDENTITY = '" + data.ENTT_IDENTITY + "' and ROOM_ID='" + data.ROOM_ID + "';select ls.*,l.*,s.*,b.*,r.* from hau_lightswitches ls inner join hau_lights l on ls.LSWT_LIGH_ID = l.LIGH_ID inner join hau_switchs s on ls.LSWT_SWIT_ID = s.SWIT_ID inner join hau_boards b on s.SWIT_BORD_ID = b.BORD_ID inner join hau_rooms r on b.BORD_ROOM_ID = r.ROOM_ID inner join hau_entities on ENTT_ID = r.ROOM_ENTT_ID  where (ls.LSWT_ISDELETED  is null or ls.LSWT_ISDELETED = 0)  AND  ENTT_IDENTITY = '" + data.ENTT_IDENTITY + "' and ROOM_ID='" + data.ROOM_ID + "';SELECT hau_tubelights.*,hau_boards.*,hau_rooms.* FROM hau_tubelights inner join hau_boards on TUBE_BORD_ID = BORD_ID inner join hau_rooms on BORD_ROOM_ID = ROOM_ID inner join hau_entities on ENTT_ID = ROOM_ENTT_ID where (TUBE_ISDELETED  is null or TUBE_ISDELETED = 0) and ENTT_IDENTITY = '" + data.ENTT_IDENTITY + "' and ROOM_ID='" + data.ROOM_ID + "';select ts.*,t.*,s.*,b.*,r.* from hau_tubelightswitches ts inner join hau_tubelights t on ts.TSWT_TUBE_ID = t.TUBE_ID inner join hau_switchs s on ts.TSWT_SWIT_ID = s.SWIT_ID inner join hau_boards b on s.SWIT_BORD_ID = b.BORD_ID inner join hau_rooms r on b.BORD_ROOM_ID = r.ROOM_ID inner join hau_entities on ENTT_ID = r.ROOM_ENTT_ID   where (ts.TSWT_ISDELETED  is null or ts.TSWT_ISDELETED = 0) AND  ENTT_IDENTITY = '" + data.ENTT_IDENTITY + "' and ROOM_ID='" + data.ROOM_ID + "';SELECT hau_tvs.*,hau_boards.*,hau_rooms.* FROM hau_tvs inner join hau_boards on TV_BORD_ID = BORD_ID inner join hau_rooms on BORD_ROOM_ID = ROOM_ID  inner join hau_entities on ENTT_ID = ROOM_ENTT_ID where (TV_ISDELETED  is null or TV_ISDELETED = 0) and ENTT_IDENTITY = '" + data.ENTT_IDENTITY + "' and ROOM_ID='" + data.ROOM_ID + "';select ts.*,t.*,s.*,b.*,r.* from hau_tvswitches ts inner join hau_tvs t on ts.TVSW_TV_ID = t.TV_ID inner join hau_switchs s on ts.TVSW_SWIT_ID = s.SWIT_ID inner join hau_boards b on s.SWIT_BORD_ID = b.BORD_ID inner join hau_rooms r on b.BORD_ROOM_ID = r.ROOM_ID inner join hau_entities on ENTT_ID = r.ROOM_ENTT_ID where (ts.TVSW_ISDELETED  is null or ts.TVSW_ISDELETED = 0)  AND  ENTT_IDENTITY = '" + data.ENTT_IDENTITY + "' and ROOM_ID='" + data.ROOM_ID + "';select ts.*,t.* from hau_tvsextraswitches ts inner join hau_tvs t on ts.TVE_TV_ID = t.TV_ID  inner join hau_boards on TV_BORD_ID = BORD_ID inner join hau_rooms on BORD_ROOM_ID = ROOM_ID  inner join hau_entities on ENTT_ID = ROOM_ENTT_ID where (TV_ISDELETED  is null or TV_ISDELETED = 0) and (ts.TVE_ISDELETED  is null or ts.TVE_ISDELETED = 0) and ENTT_IDENTITY = '" + data.ENTT_IDENTITY + "' and ROOM_ID='" + data.ROOM_ID + "';SELECT hau_acs.*,hau_boards.*,hau_rooms.* FROM hau_acs  inner join hau_boards on AC_BORD_ID = BORD_ID inner join hau_rooms on BORD_ROOM_ID = ROOM_ID inner join hau_entities on ENTT_ID = ROOM_ENTT_ID where (AC_ISDELETED  is null or AC_ISDELETED = 0) and ENTT_IDENTITY = '" + data.ENTT_IDENTITY + "' and ROOM_ID='" + data.ROOM_ID + "';select ts.*,t.*,s.*,b.*,r.* from hau_acswitches ts inner join hau_acs t on ts.ACSW_AC_ID = t.AC_ID inner join hau_switchs s on ts.ACSW_SWIT_ID = s.SWIT_ID inner join hau_boards b on s.SWIT_BORD_ID = b.BORD_ID inner join hau_rooms r on b.BORD_ROOM_ID = r.ROOM_ID inner join hau_entities on ENTT_ID = r.ROOM_ENTT_ID where (ts.ACSW_ISDELETED  is null or ts.ACSW_ISDELETED = 0) and ENTT_IDENTITY = '" + data.ENTT_IDENTITY + "' and ROOM_ID='" + data.ROOM_ID + "';select ts.*,t.* from hau_acsextraswitches ts inner join hau_acs t on ts.ACE_AC_ID = t.AC_ID  inner join hau_boards on t.AC_BORD_ID = BORD_ID inner join hau_rooms on BORD_ROOM_ID = ROOM_ID inner join hau_entities on ENTT_ID = ROOM_ENTT_ID where (AC_ISDELETED  is null or AC_ISDELETED = 0) AND (ts.ACE_ISDELETED  is null or ts.ACE_ISDELETED = 0)   AND ENTT_IDENTITY = '" + data.ENTT_IDENTITY + "'  and ROOM_ID='" + data.ROOM_ID + "';";
            connection.query(que, function (error, results, fields) {
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
                socket.emit("rooms_GetAllByOrgIdForUsers", { 'ResultCode': 200, 'details': results, 'ResultText': "" });
            });
        });

    });

}