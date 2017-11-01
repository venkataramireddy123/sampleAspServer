var commonMethods = require('../controllers/commonMethods')();

module.exports = function (socket, pool, io) {
    socket.on("tvs_GetAll", function (data) {
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

            connection.query('SELECT * FROM hau_tvs;', function (error, results, fields) {
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
                // socket.emit("Network Error", { 'ResultCode': 200, 'details': results, 'ResultText': "" });
                socket.emit("tvs_GetAll", {
                    'ResultCode': 200,
                    'details': results,
                    'ResultText': ""
                });
            });
        });


    });
    socket.on("tvs_GetAllByBoardId", function (data) {
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

            connection.query('SELECT * FROM hau_tvs where (TV_ISDELETED  is null or TV_ISDELETED = 0) and TV_BORD_ID = ' + data.id, function (error, results, fields) {
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
                // socket.emit("Network Error", { 'ResultCode': 200, 'details': results, 'ResultText': "" });
                socket.emit("tvs_GetAllByBoardId", {
                    'ResultCode': 200,
                    'details': results,
                    'ResultText': ""
                });
            });
        });


    });

    socket.on("tvs_GetByID", function (data) {
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

            connection.query('SELECT * FROM hau_tvs where TV_ID = ' + data['id'] + ';SELECT * FROM hau_tvshistory where TVH_TV_ID = ' + data['id'] + ' AND (TVH_CREATEDDATE BETWEEN DATE_SUB(curdate(), INTERVAL 1 YEAR) AND current_timestamp());SELECT * FROM hau_tvswitches ls inner join hau_switchs s on s.SWIT_ID = ls.TVSW_SWIT_ID inner join hau_boards b on b.BORD_ID = s.SWIT_BORD_ID inner join hau_rooms r on r.ROOM_ID = b.BORD_ROOM_ID WHERE TVSW_TV_ID = ' + data['id'] + '; SELECT * FROM hau_scheduling s left outer join hau_appliances a on a.APPL_ID = s.TUSH_DEV_ID left outer join hau_tvs l on a.APPL_ID = l.TV_APPL_ID left outer join hau_switchs sw on sw.SWIT_ID = s.TUSH_SWIT_ID left outer join hau_sensors sen on sen.SR_ID = s.TUSH_SR_ID left outer join hau_sensortypes senty on senty.SRTY_ID = sen.SR_SRTY_ID where l.TV_ID = ' + data['id'] + ';', function (error, results, fields) {
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
                    if (current.TVH_MODIFIEDDATE == undefined)
                        continue;
                    var currentDate = new Date(current.TVH_MODIFIEDDATE);
                    if (currentDate >= last1YearDate) {
                        if (current.TVH_ISON == 1) {
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
                                preStart = current.TVH_MODIFIEDDATE;
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
                    tv: results[0],
                    history: lastonedayRecord,
                    historyClasified: {
                        "last1Year": commonMethods.ToDHM(last1Year * 1000), "lastSixMonths": commonMethods.ToDHM(lastSixMonths * 1000), "lastThreeMonths": commonMethods.ToDHM(lastSixMonths * 1000), "lastMonth": commonMethods.ToDHM(lastMonth * 1000), "last30days": commonMethods.ToDHM(last30days * 1000), "last7days": commonMethods.ToDHM(last7days * 1000), "last1day": commonMethods.ToDHM(last1day * 1000), "last12hours": commonMethods.ToDHM(last12hours * 1000), "last6hours": commonMethods.ToDHM(last6hours * 1000), "last1hours": commonMethods.ToDHM(last1hours * 1000)
                    },
                    switches: results[2],
                    scheduling: results[3]
                }

                // Don't use the connection here, it has been returned to the pool.
                socket.emit("tvs_GetByID", {
                    'ResultCode': 200,
                    'details': results,
                    'ResultText': ""
                });
            });
        });

    });

    socket.on("tvs_postData", function (data) {
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

            var strString = commonMethods.PopulatePropertiesForSocket(obj, "TV_");
            var strStringRes = commonMethods.PopulatePropertiesResultsForSocket(obj, "TV_");
            console.log(strString);
            if (data.TV_ID) {
                connection.query("SELECT * FROM hau_tvs where (TV_ISDELETED  is null or TV_ISDELETED = 0) and TV_ID <>" + data.TV_ID + " and TV_PIN = " + data.TV_PIN + " and TV_BORD_ID =" + data.TV_BORD_ID + " ;SELECT * FROM hau_tvs where (TV_ISDELETED  is null or TV_ISDELETED = 0) and TV_ID =" + data.TV_ID, function (error1, results1, fields1) {
                    if (error1) {
                        socket.emit("Network Error", {
                            'ResultCode': 202,
                            'details': undefined,
                            'ResultText': "No Network found!"
                        });
                        return;
                    };
                    if (results1[0].length == 0) {
                        var dataForHistory = commonMethods.PopulatePropertiesForSocketForHistory(results1[1], 'TV_', 'TVH_');

                        connection.query('UPDATE hau_tvs SET ' + strString, strStringRes, function (error, results, fields) {
                            // And done with the connection.
                            // connection.release();

                            // Handle error after the release.
                            if (error) {
                                socket.emit("Network Error", {
                                    'ResultCode': 202,
                                    'details': undefined,
                                    'ResultText': "No Network found!"
                                });
                                return;
                            };
                            connection.query('INSERT INTO hau_tvshistory SET ?', dataForHistory, function (error10, results10, fields10) {
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

                                // Don't use the connection here, it has been returned to the pool.
                                // socket.emit("lights_postData", results.insertId.toString());
                            });

                            // Don't use the connection here, it has been returned to the pool.
                            // socket.emit("Network Error", {'ResultCode': 200,'details': results.changedRows,'ResultText': ""});
                            io.to(socket.USER.homeid).emit("tvs_postData", data);
                        });
                    } else {
                        connection.release();
                        socket.emit("showMessage",  {
                            'ResultCode': 204,
                            'details': undefined,
                            'ResultText': "TV Already exist Please Try another name!"
                        });
                        return;
                    }
                });
            } else {
                data.TV_CREATEDDATE = commonMethods.GetDateToString(data.TV_CREATEDDATE);
                connection.query("SELECT * FROM hau_tvs where (TV_ISDELETED  is null or TV_ISDELETED = 0) and TV_PIN = " + data.TV_PIN + " and TV_BORD_ID =" + data.TV_BORD_ID + " ;", function (error1, results1, fields1) {
                    if (error1) {
                        socket.emit("Network Error", {
                            'ResultCode': 202,
                            'details': undefined,
                            'ResultText': "No Network found!"
                        });
                        return;
                    };
                    if (results1.length == 0) {
                        connection.query('INSERT INTO hau_appliances SET ?', { "APPL_TYPE": 4, "APPL_BORD_ID": data.TV_BORD_ID, "APPL_CREATEDBY": data.TV_CREATEDBY, "APPL_CREATEDDATE": data.TV_CREATEDDATE }, function (_error, _results, _fields) {


                            // Handle error after the release.
                            if (_error) {
                                res.send({
                                    'ResultCode': 202,
                                    'details': undefined,
                                    'ResultText': "No Network found!"
                                });
                                return;
                            };
                            data.TV_APPL_ID = _results.insertId;
                            connection.query('INSERT INTO hau_tvs SET ?', data, function (error, results, fields) {
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
                                // socket.emit("Network Error", {'ResultCode': 200,'details': results.insertId,'ResultText': ""});
                                socket.emit("tvs_postData", results.insertId.toString());
                            });
                        });
                    } else {
                        connection.release();
                        socket.emit("showMessage",  {
                            'ResultCode': 204,
                            'details': undefined,
                            'ResultText': "TV Already exist Please Try another name!"
                        });
                        return;
                    }
                });
            }
        });
    });

}