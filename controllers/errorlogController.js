var commonMethods = require('./commonMethods')();
module.exports = function (app, pool) {
    app.get("/api/errorlog/GetAll", function (req, res) {
        pool.getConnection(function (err, connection) {
            // connected! (unless `err` is set)
            if (err) { res.send({ 'ResultCode': 202, 'details': undefined, 'ResultText': "No Network found!" }); return;};

            connection.query('SELECT * FROM hau_errorlog;', function (error, results, fields) {
                // And done with the connection.
                connection.release();

                // Handle error after the release.
                if (err) { res.send({ 'ResultCode': 202, 'details': undefined, 'ResultText': "No Network found!" }); return;};

                // Don't use the connection here, it has been returned to the pool.
                res.send({ 'ResultCode': 200, 'details': results, 'ResultText': "" });
            });
        });

    });

    app.get("/api/errorlog/GetByID", function (req, res) {
        pool.getConnection(function (err, connection) {
            // connected! (unless `err` is set)
            if (err) { res.send({ 'ResultCode': 202, 'details': undefined, 'ResultText': "No Network found!" }); return;};

            connection.query('SELECT * FROM hau_errorlog where ERRL_ID = ' + req.query['id'], function (error, results, fields) {
                // And done with the connection.
                connection.release();

                // Handle error after the release.
                if (err) { res.send({ 'ResultCode': 202, 'details': undefined, 'ResultText': "No Network found!" }); return;};

                // Don't use the connection here, it has been returned to the pool.
                res.send({ 'ResultCode': 200, 'details': results, 'ResultText': "" });
            });
        });

    });

    app.post("/api/errorlog/postData", function (req, res) {
        pool.getConnection(function (err, connection) {
            // connected! (unless `err` is set)
            if (err) { res.send({ 'ResultCode': 202, 'details': undefined, 'ResultText': "No Network found!" }); return;};
            var obj = req.body;

            var strString = commonMethods.PopulateProperties(obj);
            var strStringRes = commonMethods.PopulatePropertiesResults(obj);
            console.log(strString);
            if (req.body["ERRL_ID"]) {
                connection.query('UPDATE hau_errorlog SET ' + strString, strStringRes, function (error, results, fields) {
                    // And done with the connection.
                    connection.release();

                    // Handle error after the release.
                    if (err) { res.send({ 'ResultCode': 202, 'details': undefined, 'ResultText': "No Network found!" }); return;};

                    // Don't use the connection here, it has been returned to the pool.
                    res.send({'ResultCode': 200,'details': results.changedRows,'ResultText': ""});
                });
            }
            else {
                connection.query('INSERT INTO hau_errorlog SET ?', req.body, function (error, results, fields) {
                    // And done with the connection.
                    connection.release();

                    // Handle error after the release.
                    if (err) { res.send({ 'ResultCode': 202, 'details': undefined, 'ResultText': "No Network found!" }); return;};

                    // Don't use the connection here, it has been returned to the pool.
                    res.send({'ResultCode': 200,'details': results.insertId,'ResultText': ""});
                });
            }
        });
    });

}