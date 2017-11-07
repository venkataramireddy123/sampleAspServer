var commonMethods = require('./commonMethods')();
module.exports = function (app, pool) {
    app.get("/api/roles/GetAll", function (req, res) {
        commonMethods.parseToken(pool, req, res, function () {
            pool.getConnection(function (err, connection) {
                // connected! (unless `err` is set)
                if (err) { res.send({ 'ResultCode': 202, 'details': undefined, 'ResultText': "No Network found!" }); return; };

                connection.query('SELECT * FROM hau_roles where ROLE_ISDELETED IS NULL or ROLE_ISDELETED = 0 and ROLE_TYPE>=1;', function (error, results, fields) {
                    // And done with the connection.
                    connection.release();
                    // Handle error after the release.
                    if (error) { res.send({ 'ResultCode': 202, 'details': undefined, 'ResultText': "No Network found!" }); return; };

                    // Don't use the connection here, it has been returned to the pool.
                    res.send({ 'ResultCode': 200, 'details': results, 'ResultText': "" });
                });
            });
        });

    });
    app.get("/api/roles/GetAllByUser", function (req, res) {
        commonMethods.parseToken(pool, req, res, function () {
            pool.getConnection(function (err, connection) {
                // connected! (unless `err` is set)
                if (err) { res.send({ 'ResultCode': 202, 'details': undefined, 'ResultText': "No Network found!" }); return; };

                connection.query('SELECT * FROM hau_roles where ROLE_ISDELETED IS NULL or ROLE_ISDELETED = 0 and ROLE_TYPE>1;', function (error, results, fields) {
                    // And done with the connection.
                    connection.release();

                    // Handle error after the release.
                    if (error) { res.send({ 'ResultCode': 202, 'details': undefined, 'ResultText': "No Network found!" }); return; };

                    // Don't use the connection here, it has been returned to the pool.
                    res.send({ 'ResultCode': 200, 'details': results, 'ResultText': "" });
                });
            });

        });
    });
    
    app.get("/api/roles/GetAllByAdmin", function (req, res) {
        commonMethods.parseToken(pool, req, res, function () {
            pool.getConnection(function (err, connection) {
                // connected! (unless `err` is set)
                if (err) { res.send({ 'ResultCode': 202, 'details': undefined, 'ResultText': "No Network found!" }); return; };

                connection.query('SELECT * FROM hau_roles where ROLE_ISDELETED IS NULL or ROLE_ISDELETED = 0;', function (error, results, fields) {
                    // And done with the connection.
                    connection.release();

                    // Handle error after the release.
                    if (error) { res.send({ 'ResultCode': 202, 'details': undefined, 'ResultText': "No Network found!" }); return; };

                    // Don't use the connection here, it has been returned to the pool.
                    res.send({ 'ResultCode': 200, 'details': results, 'ResultText': "" });
                });
            });

        });
    });
    

    app.get("/api/roles/GetByID", function (req, res) {
        commonMethods.parseToken(pool, req, res, function () {
            pool.getConnection(function (err, connection) {
                // connected! (unless `err` is set)
                if (err) { res.send({ 'ResultCode': 202, 'details': undefined, 'ResultText': "No Network found!" }); return; };

                connection.query('SELECT * FROM hau_roles where ROLE_ID = ' + req.query['id'], function (error, results, fields) {
                    // And done with the connection.
                    connection.release();

                    // Handle error after the release.
                    if (error) { res.send({ 'ResultCode': 202, 'details': undefined, 'ResultText': "No Network found!" }); return; };

                    // Don't use the connection here, it has been returned to the pool.
                    res.send({ 'ResultCode': 200, 'details': results, 'ResultText': "" });
                });
            });

        });
    });

    app.post("/api/roles/postData", function (req, res) {
        commonMethods.parseToken(pool, req, res, function () {
            pool.getConnection(function (err, connection) {
                // connected! (unless `err` is set)
                if (err) { res.send({ 'ResultCode': 202, 'details': undefined, 'ResultText': "No Network found!" }); return; };
                var obj = req.body;

                var strString = commonMethods.PopulateProperties(obj);
                var strStringRes = commonMethods.PopulatePropertiesResults(obj);
                console.log(strString);
                if (req.body["ROLE_ID"]) {
                    connection.query('UPDATE hau_roles SET ' + strString, strStringRes, function (error, results, fields) {
                        // And done with the connection.
                        connection.release();

                        // Handle error after the release.
                        if (error) { res.send({ 'ResultCode': 202, 'details': undefined, 'ResultText': "No Network found!" }); return; };

                        // Don't use the connection here, it has been returned to the pool.
                        res.send({ 'ResultCode': 200, 'details': results.changedRows, 'ResultText': "" });
                    });
                }
                else {
                    connection.query('INSERT INTO hau_roles SET ?', req.body, function (error, results, fields) {
                        // And done with the connection.
                        connection.release();

                        // Handle error after the release.
                        if (error) { res.send({ 'ResultCode': 202, 'details': undefined, 'ResultText': "No Network found!" }); return; };

                        // Don't use the connection here, it has been returned to the pool.
                        res.send({ 'ResultCode': 200, 'details': results.insertId, 'ResultText': "" });
                    });
                }
            });
        });
    });

}