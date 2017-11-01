var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'abcdefg';

module.exports = function () {
    return {
        ToDHM: function (ms) {
            var days = Math.floor(ms / (24 * 60 * 60 * 1000));
            var daysms = ms % (24 * 60 * 60 * 1000);
            var hours = Math.floor((daysms) / (60 * 60 * 1000));
            var hoursms = ms % (60 * 60 * 1000);
            var minutes = Math.floor((hoursms) / (60 * 1000));
            var minutesms = ms % (60 * 1000);
            var sec = Math.floor((minutesms) / (1000));
            return (days > 0 ? days + " days, " : "") + (hours > 0 ? hours + " hours, " : "") + (minutes > 0 ? minutes + " minutes, " : "") + (sec > 0 ? sec + " sec" : "");
        },
        PopulatePropertiesResultsForSocketForHistory: function (objbody, prefix, historyPrefix) {
            var setStrings = [];
            var body = objbody[0]
            var obj = Object.keys(body);
            for (var i = 1; i < obj.length; i++) {
                if ((body[obj[i]] || body[obj[i]] == 0)) {
                    if (obj[i].indexOf('DATE') > -1) {
                        // setStrings +=obj[i]+"=?,";
                        // var date = new Date(body[obj[i]]);
                        setStrings.push(this.GetDateToString(body[obj[i]]));
                    } else
                        setStrings.push(body[obj[i]]);
                }
            }
            if (obj.length > 0) {

                if (obj[0].indexOf('DATE') > -1) {
                    setStrings.push(this.GetDateToString(body[obj[0]]));
                } else
                    setStrings.push(body[obj[0]]);

                // setStrings +=obj[obj.length-1]+"=? where "+obj[0]+"=:?";

            }
            return setStrings;
        },
        PopulatePropertiesForUserAccess: function (objbody, prefix, historyPrefix) {
            //debugger;
            var setStrings = '{';
            var body = objbody;
            var obj = Object.keys(body);
            for (var i = 1; i < obj.length; i++) {
                if ((body[obj[i]] || body[obj[i]] == 0) && obj[i].indexOf(prefix) == 0) {
                    if (obj[i].indexOf('DATE') > -1) {
                        setStrings += "\"" + obj[i].replace(prefix, historyPrefix) + "\"" + ":\"" + this.GetDateToString(body[obj[i]]) + "\",";
                    } else {
                        setStrings += "\"" + obj[i].replace(prefix, historyPrefix) + "\"" + ":\"" + (body[obj[i]] == true ? 1 : (body[obj[i]] == false ? 0 : body[obj[i]])) + "\",";
                    }

                }
            }
            if (obj.length > 0) {
                setStrings += "\"" + obj[0].replace(prefix, historyPrefix) + "\"" + ":\"" + body[obj[0]] + "\"}";
            }
            return JSON.parse(setStrings);
        },
        PopulatePropertiesForSocketForHistory: function (objbody, prefix, historyPrefix) {
            //debugger;
            var setStrings = '{';
            var body = objbody[0];
            var obj = Object.keys(body);
            for (var i = 1; i < obj.length; i++) {
                if ((body[obj[i]] || body[obj[i]] == 0) && obj[i].indexOf(prefix) == 0) {
                    if (obj[i].indexOf('DATE') > -1) {
                        setStrings += "\"" + obj[i].replace(prefix, historyPrefix) + "\"" + ":\"" + this.GetDateToString(body[obj[i]]) + "\",";
                    } else {
                        setStrings += "\"" + obj[i].replace(prefix, historyPrefix) + "\"" + ":\"" + body[obj[i]] + "\",";
                    }

                }
            }
            if (obj.length > 0) {
                setStrings += "\"" + historyPrefix + obj[0] + "\"" + ":\"" + body[obj[0]] + "\"}";
            }
            return JSON.parse(setStrings);
        },
        parseTokenForSockets: function (pool, socket, token, decToken, errorCallback, successCallback) {

            pool.getConnection(function (err, connection) {
                // connected! (unless `err` is set)
                if (err) {
                    errorCallback({
                        'ResultCode': 202,
                        'details': undefined,
                        'ResultText': "No Network found!"
                    });
                    return;
                };
                var waitTill = new Date(new Date().getTime() + 1 * 1000);
                while (waitTill > new Date()) { }
                var date = new Date();
                connection.query('UPDATE hau_token SET TOKN_EXPIRESON=?, TOKN_MODIFIEDDATE=? where TOKN_AUTHTOKEN =? and TOKN_EXPIRESON >= now()', [(new Date(date.setTime(date.getTime() + 1 * 86400000))), new Date(), token], function (error, results, fields) {
                    // And done with the connection.
                    connection.release();

                    // Handle error after the release.
                    if (error) {
                        errorCallback({
                            'ResultCode': 202,
                            'details': undefined,
                            'ResultText': "No Network found!"
                        });
                        return;
                    };

                    // Don't use the connection here, it has been returned to the pool.
                    if (results.affectedRows == 0) {
                        errorCallback({
                            'ResultCode': 203,
                            'details': undefined,
                            'ResultText': "Authentication Failure!"
                        });
                        return;
                    }
                    // debugger;
                    var _token = decToken;
                    var data = _token == undefined ? undefined : _token.split(";;;");
                    socket.USER = {
                        "USER_ID": data[0],
                        "USER_USERNAME": data[1],
                        "USER_ROLE_ID": data[2],
                        "USER_ENTT_ID": data[3],
                        "homeid": data[4].toString().toLowerCase()
                    };
                    try {
                        socket.leave(socket.USER.homeid);

                    }
                    catch (e) {

                    }
                    socket.join(socket.USER.homeid);
                    successCallback()
                    // socket.emit("Network Error",{'ResultCode': 200,'details': results.changedRows,'ResultText': ""});
                });
            });
        },
        parseToken: function (pool, req, res, successCallback) {
            var token = req.headers["token"];
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

                var date = new Date();
                connection.query('UPDATE hau_token SET TOKN_EXPIRESON=?, TOKN_MODIFIEDDATE=? where TOKN_AUTHTOKEN =? and TOKN_EXPIRESON > now()', [(new Date(date.setTime(date.getTime() + 1 * 86400000))), new Date(), token], function (error, results, fields) {
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
                    if (results.affectedRows == 0) {
                        res.send({
                            'ResultCode': 203,
                            'details': undefined,
                            'ResultText': "Authentication Failure!"
                        });
                        return;
                    }
                    successCallback()
                    // res.send({'ResultCode': 200,'details': results.changedRows,'ResultText': ""});
                });
            });
        },
        encrypt: function (buf) {
            // var buffer = new Buffer(buf, "utf8")
            // var cipher = crypto.createCipher(algorithm,password)
            // var crypted = Buffer.concat([cipher.update(buffer),cipher.final()]);
            // return crypted.toString("utf8");
            return new Buffer(buf).toString('base64');
        },

        decrypt: function (buffer) {
            // var decipher = crypto.createDecipher(algorithm,password)
            // var dec = Buffer.concat([decipher.update(buffer) , decipher.final()]);
            // return dec;
            return new Buffer(buffer, 'base64').toString('ascii')
        },
        PopulateProperties: function (body) {
            var setStrings = '';
            var obj = Object.keys(body);
            for (var i = 1; i < obj.length - 1; i++) {
                if (body[obj[i]] || body[obj[i]] == 0) {
                    setStrings += obj[i] + "=?,";
                }
            }
            if (obj.length > 0) {
                setStrings += obj[obj.length - 1] + "=? where " + obj[0] + "=?";
            }
            return setStrings;
        },
        PopulatePropertiesForSocket: function (body, startsWith) {
            var setStrings = '';
            var obj = Object.keys(body);
            for (var i = 1; i < obj.length; i++) {
                if ((body[obj[i]] || body[obj[i]] == 0) && obj[i].indexOf(startsWith) == 0) {
                    setStrings += obj[i] + "=?,";
                }
            }
            if (obj.length > 0) {
                setStrings = setStrings.substring(0, setStrings.length - 1) + " where " + obj[0] + "=?";
            }
            return setStrings;
        },
        GetDateToString: function (date) {
            var _date = new Date(date);
            var yyyy = _date.getFullYear();
            var mm = _date.getMonth() < 9 ? "0" + (_date.getMonth() + 1) : (_date.getMonth() + 1); // getMonth() is zero-based
            var dd = _date.getDate() < 10 ? "0" + _date.getDate() : _date.getDate();
            var hh = _date.getHours() < 10 ? "0" + _date.getHours() : _date.getHours();
            var min = _date.getMinutes() < 10 ? "0" + _date.getMinutes() : _date.getMinutes();
            var ss = _date.getSeconds() < 10 ? "0" + _date.getSeconds() : _date.getSeconds();
            return yyyy + "-" + mm + "-" + dd + " " + hh + ":" + min + ":" + ss //"".concat(yyyy).concat(mm).concat(dd).concat(hh).concat(min).concat(ss);

            // return _date.getFullYear()+"-"+_date.getMonth()+"-"+_date.getDay()+" "+_date.getHours()+":"+_date.getMinutes()+":"+_date.getSeconds()
        },
        PopulatePropertiesResults: function (body) {
            var setStrings = [];
            var obj = Object.keys(body);
            for (var i = 1; i < obj.length - 1; i++) {
                if (body[obj[i]] || body[obj[i]] == 0) {
                    if (obj[i].indexOf('DATE') > -1) {
                        // setStrings +=obj[i]+"=?,";
                        // var date = new Date(body[obj[i]]);
                        setStrings.push(this.GetDateToString(body[obj[i]]));
                    } else
                        setStrings.push(body[obj[i]]);
                }
            }
            if (obj.length > 0) {
                if (obj[obj.length - 1].indexOf('DATE') > -1) {
                    setStrings.push(this.GetDateToString(body[obj[obj.length - 1]]));
                } else
                    setStrings.push(body[obj[obj.length - 1]]);
                if (obj[0].indexOf('DATE') > -1) {
                    setStrings.push(this.GetDateToString(body[obj[0]]));
                } else
                    setStrings.push(body[obj[0]]);

                // setStrings +=obj[obj.length-1]+"=? where "+obj[0]+"=:?";

            }
            return setStrings;
        },
        PopulatePropertiesResultsForSocket: function (body, startsWith) {
            var setStrings = [];
            var obj = Object.keys(body);
            for (var i = 1; i < obj.length; i++) {
                if ((body[obj[i]] || body[obj[i]] == 0) && obj[i].indexOf(startsWith) == 0) {
                    if (obj[i].indexOf('DATE') > -1) {
                        // setStrings +=obj[i]+"=?,";
                        // var date = new Date(body[obj[i]]);
                        setStrings.push(this.GetDateToString(body[obj[i]]));
                    } else
                        setStrings.push(body[obj[i]] == true ? 1 : (body[obj[i]] == false ? 0 : body[obj[i]]));
                }
            }
            if (obj.length > 0) {

                if (obj[0].indexOf('DATE') > -1) {
                    setStrings.push(this.GetDateToString(body[obj[0]]));
                } else
                    setStrings.push(body[obj[0]]);

                // setStrings +=obj[obj.length-1]+"=? where "+obj[0]+"=:?";

            }
            return setStrings;
        }
    }

}