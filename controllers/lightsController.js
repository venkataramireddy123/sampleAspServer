var commonMethods = require('./commonMethods')();
var DateDiff = require('date-diff');
module.exports = function (app, pool) {
    app.get("/api/lights/GetAll", function (req, res) {
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

                connection.query('SELECT * FROM hau_lights;', function (error, results, fields) {
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
    app.post("/api/lights/GetAllByBoardId", function (req, res) {
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

                connection.query('SELECT * FROM hau_lights where (LIGH_ISDELETED  is null or LIGH_ISDELETED = 0) and LIGH_BORD_ID = ' + req.body.LIGH_BORD_ID, function (error, results, fields) {
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

    app.get("/api/lights/GetByID", function (req, res) {
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

                connection.query('SELECT * FROM hau_lights where LIGH_ID = ' + req.query['id'] + ';SELECT * FROM hau_lightshistory where LIGHH_LIGH_ID = ' + req.query['id'] + ' AND (LIGHH_CREATEDDATE BETWEEN DATE_SUB(curdate(), INTERVAL 1 YEAR) AND current_timestamp());SELECT * FROM hau_lightswitches ls inner join hau_switchs s on s.SWIT_ID = ls.LSWT_SWIT_ID inner join hau_boards b on b.BORD_ID = s.SWIT_BORD_ID inner join hau_rooms r on r.ROOM_ID = b.BORD_ROOM_ID WHERE LSWT_LIGH_ID = ' + req.query['id'] + '; SELECT * FROM hau_scheduling s left outer join hau_appliances a on a.APPL_ID = s.TUSH_DEV_ID left outer join hau_lights l on a.APPL_ID = l.LIGH_APPL_ID left outer join hau_switchs sw on sw.SWIT_ID = s.TUSH_SWIT_ID left outer join hau_sensors sen on sen.SR_ID = s.TUSH_SR_ID left outer join hau_sensortypes senty on senty.SRTY_ID = sen.SR_SRTY_ID where l.LIGH_ID = ' + req.query['id'] + ';', function (error, results, fields) {
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
                        if (current.LIGHH_MODIFIEDDATE == undefined)
                            continue;
                        var currentDate = new Date(current.LIGHH_MODIFIEDDATE);
                        if (currentDate >= last1YearDate) {
                            if (current.LIGHH_ISON == 1) {
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
                                    preStart = current.LIGHH_MODIFIEDDATE;
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
                        light: results[0],
                        history: lastonedayRecord,
                        historyClasified: {
                            "last1Year": commonMethods.ToDHM(last1Year * 1000), "lastSixMonths": commonMethods.ToDHM(lastSixMonths * 1000), "lastThreeMonths": commonMethods.ToDHM(lastSixMonths * 1000), "lastMonth": commonMethods.ToDHM(lastMonth * 1000), "last30days": commonMethods.ToDHM(last30days * 1000), "last7days": commonMethods.ToDHM(last7days * 1000), "last1day": commonMethods.ToDHM(last1day * 1000), "last12hours": commonMethods.ToDHM(last12hours * 1000), "last6hours": commonMethods.ToDHM(last6hours * 1000), "last1hours": commonMethods.ToDHM(last1hours * 1000)
                        },
                        switches: results[2],
                        scheduling: results[3]
                    }
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

    app.post("/api/lights/postData", function (req, res) {
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
                if (req.body["LIGH_ID"]) {
                    connection.query("SELECT * FROM hau_lights where (LIGH_ISDELETED  is null or LIGH_ISDELETED = 0) and LIGH_ID <>" + req.body.LIGH_ID + " and LIGH_PIN = " + req.body.LIGH_PIN + " and LIGH_BORD_ID =" + req.body.LIGH_BORD_ID + " ;", function (error1, results1, fields1) {
                        if (error1) {
                            res.send({
                                'ResultCode': 202,
                                'details': undefined,
                                'ResultText': "No Network found!"
                            });
                            return;
                        };
                        if (results1.length == 0) {
                            connection.query('UPDATE hau_lights SET ' + strString, strStringRes, function (error, results, fields) {
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
                                'ResultText': "Light Already exist Please Try another name!"
                            });
                            return;
                        }
                    });
                } else {
                    req.body.LIGH_CREATEDDATE = commonMethods.GetDateToString(req.body.LIGH_CREATEDDATE);
                    connection.query("SELECT * FROM hau_lights where (LIGH_ISDELETED  is null or LIGH_ISDELETED = 0) and LIGH_PIN = " + req.body.LIGH_PIN + " and LIGH_BORD_ID =" + req.body.LIGH_BORD_ID + " ;", function (error1, results1, fields1) {
                        if (error1) {
                            res.send({
                                'ResultCode': 202,
                                'details': undefined,
                                'ResultText': "No Network found!"
                            });
                            return;
                        };
                        if (results1.length == 0) {
                            connection.query('INSERT INTO hau_appliances SET ?', { "APPL_TYPE": 1, "APPL_BORD_ID": req.body.LIGH_BORD_ID, "APPL_CREATEDBY": req.body.LIGH_CREATEDBY, "APPL_CREATEDDATE": req.body.LIGH_CREATEDDATE }, function (_error, _results, _fields) {

                                // Handle error after the release.
                                if (_error) {
                                    res.send({
                                        'ResultCode': 202,
                                        'details': undefined,
                                        'ResultText': "No Network found!"
                                    });
                                    return;
                                };
                                req.body.LIGH_APPL_ID = _results.insertId;
                                // Don't use the connection here, it has been returned to the pool.
                                connection.query('INSERT INTO hau_lights SET ?', req.body, function (error, results, fields) {
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
                            });

                        } else {
                            connection.release();
                            res.send({
                                'ResultCode': 204,
                                'details': undefined,
                                'ResultText': "Light Already exist Please Try another name!"
                            });
                            return;
                        }
                    });
                }
            });
        });
    });

}