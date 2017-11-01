var commonMethods = require('./commonMethods')();
module.exports = function (app, pool) {
    app.get("/api/sensortypes/GetAll", function (req, res) {
        commonMethods.parseToken(pool, req, res, function () {
            pool.getConnection(function (err, connection) {
                // connected! (unless `err` is set)
                if (err) { res.send({ 'ResultCode': 202, 'details': undefined, 'ResultText': "No Network found!" }); return; };

                connection.query('SELECT * FROM hau_sensortypes;', function (error, results, fields) {
                    // And done with the connection.
                    connection.release();

                    // Handle error after the release.
                    if (err) { res.send({ 'ResultCode': 202, 'details': undefined, 'ResultText': "No Network found!" }); return; };

                    // Don't use the connection here, it has been returned to the pool.
                    res.send({ 'ResultCode': 200, 'details': results, 'ResultText': "" });
                });
            });

        });
    });

    app.get("/api/sensortypes/GetByID", function (req, res) {
        commonMethods.parseToken(pool, req, res, function () {
            pool.getConnection(function (err, connection) {
                // connected! (unless `err` is set)
                if (err) { res.send({ 'ResultCode': 202, 'details': undefined, 'ResultText': "No Network found!" }); return; };

                connection.query('SELECT * FROM hau_sensortypes where SRTY_ID = ' + req.query['id'], function (error, results, fields) {
                    // And done with the connection.
                    connection.release();

                    // Handle error after the release.
                    if (err) { res.send({ 'ResultCode': 202, 'details': undefined, 'ResultText': "No Network found!" }); return; };

                    // Don't use the connection here, it has been returned to the pool.
                    res.send({ 'ResultCode': 200, 'details': results, 'ResultText': "" });
                });
            });

        });
    });

    app.post("/api/sensortypes/postData", function (req, res) {
        commonMethods.parseToken(pool, req, res, function () {
            pool.getConnection(function (err, connection) {
                // connected! (unless `err` is set)
                if (err) { res.send({ 'ResultCode': 202, 'details': undefined, 'ResultText': "No Network found!" }); return; };
                var obj = req.body;

                var strString = commonMethods.PopulateProperties(obj);
                var strStringRes = commonMethods.PopulatePropertiesResults(obj);
                console.log(strString);
                if (req.body["SRTY_ID"]) {
                    connection.query('UPDATE hau_sensortypes SET ' + strString, strStringRes, function (error, results, fields) {
                        // And done with the connection.
                        connection.release();

                        // Handle error after the release.
                        if (err) { res.send({ 'ResultCode': 202, 'details': undefined, 'ResultText': "No Network found!" }); return; };

                        // Don't use the connection here, it has been returned to the pool.
                        res.send({ 'ResultCode': 200, 'details': results.changedRows, 'ResultText': "" });
                    });
                }
                else {
                    connection.query('INSERT INTO hau_sensortypes SET ?', req.body, function (error, results, fields) {
                        // And done with the connection.
                        connection.release();

                        // Handle error after the release.
                        if (err) { res.send({ 'ResultCode': 202, 'details': undefined, 'ResultText': "No Network found!" }); return; };

                        // Don't use the connection here, it has been returned to the pool.
                        res.send({ 'ResultCode': 200, 'details': results.insertId, 'ResultText': "" });
                    });
                }
            });
        });
    });

}