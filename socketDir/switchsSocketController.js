var commonMethods = require('../controllers/commonMethods')();

module.exports = function (socket, pool, io) {
    socket.on("switchs_GetAll", function (data) {
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
            connection.query('SELECT * FROM hau_switchs where (SWIT_ISDELETED  is null or SWIT_ISDELETED = 0);', function (error, results, fields) {
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
                socket.emit("switchs_GetAll", { 'ResultCode': 200, 'details': results, 'ResultText': "" });
            });
        });


    });
    socket.on("switchs_GetAllByBoardId", function (data) {
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
            connection.query('SELECT * FROM hau_switchs where (SWIT_ISDELETED  is null or SWIT_ISDELETED = 0) and SWIT_BORD_ID = ' + data.id, function (error, results, fields) {
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
                socket.emit("switchs_GetAllByBoardId", { 'ResultCode': 200, 'details': results, 'ResultText': "" });
            });
        });


    });

    socket.on("switchs_GetByID", function (data) {
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

            connection.query('SELECT * FROM hau_switchs where SWIT_ID = ' + data['id'] + ';SELECT * FROM hau_switchshistory where SWITH_SWIT_ID = ' + data['id'] + ' AND (SWITH_CREATEDDATE BETWEEN DATE_SUB(curdate(), INTERVAL ' + data['id'] + ' YEAR) AND current_timestamp());(select a.*,aty.*,b.*,r.*,LSWT_LIGH_ID PRIORITY from hau_appliances a inner join hau_appliancestype  aty on aty.APTY_ID = a.APPL_TYPE inner join hau_lights l on l.LIGH_APPL_ID = a.APPL_ID inner join hau_lightswitches ls on ls.LSWT_LIGH_ID = l.LIGH_ID inner join hau_switchs s on s.SWIT_ID = ls.LSWT_SWIT_ID inner join hau_boards b on b.BORD_ID = s.SWIT_BORD_ID inner join hau_rooms r on r.ROOM_ID = b.BORD_ROOM_ID where s.SWIT_ID = ' + data['id'] + ') union (select a.*,aty.*,b.*,r.*,TSWT_PRIO_ID PRIORITY from hau_appliances a inner join hau_appliancestype  aty on aty.APTY_ID = a.APPL_TYPE inner join hau_tubelights l on l.TUBE_APPL_ID = a.APPL_ID inner join hau_tubelightswitches ts on ts.TSWT_TUBE_ID = l.TUBE_ID inner join hau_switchs s on s.SWIT_ID = ts.TSWT_SWIT_ID  inner join hau_boards b on b.BORD_ID = s.SWIT_BORD_ID inner join hau_rooms r on r.ROOM_ID = b.BORD_ROOM_ID where s.SWIT_ID = ' + data['id'] + ') union (select a.*,aty.*,b.*,r.*,FSWT_PRIO_ID PRIORITY from hau_appliances a inner join hau_appliancestype  aty on aty.APTY_ID = a.APPL_TYPE inner join hau_fans f on f.FAN_APPL_ID = a.APPL_ID inner join hau_fanswitches fs on fs.FSWT_FAN_ID = f.FAN_ID inner join hau_switchs s on s.SWIT_ID = fs.FSWT_SWIT_ID inner join hau_boards b on b.BORD_ID = s.SWIT_BORD_ID inner join hau_rooms r on r.ROOM_ID = b.BORD_ROOM_ID where s.SWIT_ID = ' + data['id'] + ') union (select a.*,aty.*,b.*,r.*,TVSW_PRIO_ID PRIORITY from hau_appliances a inner join hau_appliancestype  aty on aty.APTY_ID = a.APPL_TYPE inner join hau_tvs t on t.TV_APPL_ID = a.APPL_ID inner join hau_tvswitches tvs on tvs.TVSW_TV_ID = t.TV_ID inner join hau_switchs s on s.SWIT_ID = tvs.TVSW_SWIT_ID inner join hau_boards b on b.BORD_ID = s.SWIT_BORD_ID inner join hau_rooms r on r.ROOM_ID = b.BORD_ROOM_ID where s.SWIT_ID = ' + data['id'] + ') union (select a.*,aty.*,b.*,r.*,ACSW_PRIO_ID PRIORITY from hau_appliances a inner join hau_appliancestype  aty on aty.APTY_ID = a.APPL_TYPE inner join hau_acs ac on ac.AC_APPL_ID = a.APPL_ID inner join hau_acswitches acs on acs.ACSW_AC_ID = ac.AC_ID inner join hau_switchs s on s.SWIT_ID = acs.ACSW_SWIT_ID inner join hau_boards b on b.BORD_ID = s.SWIT_BORD_ID inner join hau_rooms r on r.ROOM_ID = b.BORD_ROOM_ID where s.SWIT_ID = ' + data['id'] + '); SELECT * FROM hau_scheduling s left outer join hau_switchs sw on sw.SWIT_ID = s.TUSH_SWIT_ID left outer join hau_sensors sen on sen.SR_ID = s.TUSH_SR_ID left outer join hau_sensortypes senty on senty.SRTY_ID = sen.SR_SRTY_ID where SWIT_ID = ' + data['id'] + ';', function (error, results, fields) {
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
                var yearon = 0, last1Year = 0, lastSixMonths = 0, lastThreeMonths = 0, lastMonth = 0, last30days = 0, lastWeek = 0, last7days = 0, last1day = 0, last12hours = 0, last6hours = 0, last1hours = 0, lastOn = 0;

                var last1YearDate = new Date();
                //last1YearDate.setMonth(last1YearDate.getMonth(), -12);
                last1YearDate.setFullYear(last1YearDate.getFullYear() - 1, last1YearDate.getMonth(), last1YearDate.getDate());
                var lastSixMonthsDate = new Date();
                lastSixMonthsDate.setMonth(lastSixMonthsDate.getMonth() - 6);
                lastSixMonthsDate.setDate(1);
                var lastThreeMonthsDate = new Date();
                lastThreeMonthsDate.setMonth(lastThreeMonthsDate.getMonth() - 3);
                lastThreeMonthsDate.setDate(1);
                var lastMonthDate = new Date();
                lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
                lastMonthDate.setDate(1);
                var last30daysDate = new Date();
                last30daysDate.setDate(last30daysDate.getDate() - 30);
                var last7daysDate = new Date();
                last7daysDate.setDate(last7daysDate.getDate() - 7);
                var last1dayDate = new Date();
                last1dayDate.setDate(last1dayDate.getDate() - 1);
                var last12hoursDate = new Date();
                last12hoursDate.setDate(last12hoursDate.getDate() - 1);
                var last6hoursDate = new Date();
                last6hoursDate.setHours(last6hoursDate.getHours() - 6);
                var last1hoursDate = new Date();
                last1hoursDate.setHours(last1hoursDate.getHours() - 1);

                var preStart;
                var lastonedayRecord = [];
                for (var i = 0; i < results[1].length; i++) {
                    var current = results[1][i];
                    if (current.SWITH_MODIFIEDDATE == undefined)
                        continue;
                    var currentDate = new Date(current.SWITH_MODIFIEDDATE);
                    if (currentDate >= last1YearDate) {
                        if (current.SWITH_ISON == 1) {
                            if (preStart != undefined) {
                                var diff = new DateDiff(currentDate, preStart);
                                preStart = undefined;
                                last1Year += diff.seconds();
                                if (currentDate >= lastSixMonthsDate) {
                                    lastSixMonths += diff.seconds();
                                    if (currentDate >= lastThreeMonthsDate) {
                                        lastThreeMonths += diff.seconds();
                                        if (currentDate >= lastMonthDate) {
                                            lastMonth += diff.seconds();
                                            if (currentDate >= last30daysDate) {
                                                last30days += diff.seconds();
                                                if (currentDate >= last7daysDate) {
                                                    last7days += diff.seconds();
                                                    if (currentDate >= last1dayDate) {
                                                        current.time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
                                                        lastonedayRecord.push(current);
                                                        last1day += diff.seconds();
                                                        if (currentDate >= last12hoursDate) {
                                                            last12hours += diff.seconds();
                                                            if (currentDate >= last6hoursDate) {
                                                                last6hours += diff.seconds();
                                                                if (currentDate >= last1hoursDate) {
                                                                    last1hours += diff.seconds();
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            else {
                                preStart = current.SWITH_MODIFIEDDATE;
                                if (currentDate >= last1dayDate) {
                                    current.time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
                                    lastonedayRecord.push(current);
                                }
                            }
                        }
                        else {
                            if (preStart != undefined) {
                                var diff = new DateDiff(currentDate, preStart);
                                preStart = undefined;
                                last1Year += diff.seconds();
                                if (currentDate >= lastSixMonthsDate) {
                                    lastSixMonths += diff.seconds();
                                    if (currentDate >= lastThreeMonthsDate) {
                                        lastThreeMonths += diff.seconds();
                                        if (currentDate >= lastMonthDate) {
                                            lastMonth += diff.seconds();
                                            if (currentDate >= last30daysDate) {
                                                last30days += diff.seconds();
                                                if (currentDate >= last7daysDate) {
                                                    last7days += diff.seconds();
                                                    if (currentDate >= last1dayDate) {
                                                        current.time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
                                                        lastonedayRecord.push(current);
                                                        last1day += diff.seconds();
                                                        if (currentDate >= last12hoursDate) {
                                                            last12hours += diff.seconds();
                                                            if (currentDate >= last6hoursDate) {
                                                                last6hours += diff.seconds();
                                                                if (currentDate >= last1hoursDate) {
                                                                    last1hours += diff.seconds();
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                    }
                }

                var results = {
                    switche: results[0],
                    history: lastonedayRecord,
                    historyClasified: {
                        "last1Year": commonMethods.ToDHM(last1Year * 1000), "lastSixMonths": commonMethods.ToDHM(lastSixMonths * 1000), "lastThreeMonths": commonMethods.ToDHM(lastSixMonths * 1000), "lastMonth": commonMethods.ToDHM(lastMonth * 1000), "last30days": commonMethods.ToDHM(last30days * 1000), "last7days": commonMethods.ToDHM(last7days * 1000), "last1day": commonMethods.ToDHM(last1day * 1000), "last12hours": commonMethods.ToDHM(last12hours * 1000), "last6hours": commonMethods.ToDHM(last6hours * 1000), "last1hours": commonMethods.ToDHM(last1hours * 1000)
                    },
                    appliances: results[2],
                    scheduling: results[3]
                }

                // Don't use the connection here, it has been returned to the pool.
                socket.emit("switchs_GetByID", { 'ResultCode': 200, 'details': results, 'ResultText': "" });
            });
        });

    });

    socket.on("switchs_postData", function (data) {
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

            var strString = commonMethods.PopulatePropertiesForSocket(obj, 'SWIT_');
            var strStringRes = commonMethods.PopulatePropertiesResultsForSocket(obj, 'SWIT_');
            console.log(strString);
            if (data.SWIT_ID) {
                connection.query("SELECT * FROM hau_switchs where (SWIT_ISDELETED  is null or SWIT_ISDELETED = 0) and SWIT_ID =" + data.SWIT_ID + " ; ", function (error1, results1, fields1) {
                    if (error1) {
                        socket.emit("Network Error", {
                            'ResultCode': 202,
                            'details': undefined,
                            'ResultText': "No Network found!"
                        });
                        return;
                    };
                    if (results1.length == 1) {

                        var dataForHistory = commonMethods.PopulatePropertiesForSocketForHistory(results1, 'SWIT_', 'SWITH_');

                        connection.query('UPDATE hau_switchs SET ' + strString, strStringRes, function (error, results, fields) {

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
                            connection.query('INSERT INTO hau_switchshistory SET ?', dataForHistory, function (error10, results10, fields10) {
                                // And done with the connection.
                                connection.release();

                                // Handle error after the release.
                                if (error10) {
                                    socket.emit("Network Error", {
                                        'ResultCode': 202,
                                        'details': undefined,
                                        'ResultText': "No Network found!"
                                    });
                                    return;
                                };

                                io.to(socket.USER.homeid).emit("switchs_postData", data);
                            });

                        });
                    }
                });
            }
            else {
                connection.query('INSERT INTO hau_switchs SET ?', data, function (error, results, fields) {
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
                    socket.emit("switchs_postData", results.insertId.toString());
                });
            }
        });

    });
    socket.on("applenceSwitchs_GetAll", function (data) {
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
            connection.query('select ts.*,t.*,s.*,b.*,r.* from hau_acswitches ts inner join hau_acs t on ts.ACSW_AC_ID = t.AC_ID inner join hau_switchs s on ts.ACSW_SWIT_ID = s.SWIT_ID inner join hau_boards b on s.SWIT_BORD_ID = b.BORD_ID inner join hau_rooms r on b.BORD_ROOM_ID = r.ROOM_ID where (ts.ACSW_ISDELETED  is null or ts.ACSW_ISDELETED = 0) and b.BORD_ID = ' + data.id +';select fs.*,f.*,s.*,b.*,r.* from hau_fanswitches fs inner join hau_fans f on fs.FSWT_FAN_ID = f.FAN_ID inner join hau_switchs s on fs.FSWT_SWIT_ID = s.SWIT_ID inner join hau_boards b on s.SWIT_BORD_ID = b.BORD_ID inner join hau_rooms r on b.BORD_ROOM_ID = r.ROOM_ID where (fs.FSWT_ISDELETED  is null or fs.FSWT_ISDELETED = 0) and b.BORD_ID = ' + data.id +';select ls.*,l.*,s.*,b.*,r.* from hau_lightswitches ls inner join hau_lights l on ls.LSWT_LIGH_ID = l.LIGH_ID inner join hau_switchs s on ls.LSWT_SWIT_ID = s.SWIT_ID inner join hau_boards b on s.SWIT_BORD_ID = b.BORD_ID inner join hau_rooms r on b.BORD_ROOM_ID = r.ROOM_ID where (ls.LSWT_ISDELETED  is null or ls.LSWT_ISDELETED = 0) and b.BORD_ID = ' + data.id+';select ts.*,t.*,s.*,b.* from hau_tubelightswitches ts inner join hau_tubelights t on ts.TSWT_TUBE_ID = t.TUBE_ID inner join hau_switchs s on ts.TSWT_SWIT_ID = s.SWIT_ID inner join hau_boards b on s.SWIT_BORD_ID = b.BORD_ID  where (ts.TSWT_ISDELETED  is null or ts.TSWT_ISDELETED = 0) and b.BORD_ID = ' + data.id+';select ts.*,t.*,s.*,b.*,r.* from hau_tvswitches ts inner join hau_tvs t on ts.TVSW_TV_ID = t.TV_ID inner join hau_switchs s on ts.TVSW_SWIT_ID = s.SWIT_ID inner join hau_boards b on s.SWIT_BORD_ID = b.BORD_ID inner join hau_rooms r on b.BORD_ROOM_ID = r.ROOM_ID where (ts.TVSW_ISDELETED  is null or ts.TVSW_ISDELETED = 0) and b.BORD_ID = ' + data.id+';', function (error, results, fields) {
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
                socket.emit("applenceSwitchs_GetAll", { 'ResultCode': 200, 'details': results, 'ResultText': "" });
            });
        });


    });
    

}