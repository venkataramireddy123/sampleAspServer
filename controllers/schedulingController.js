var commonMethods = require('./commonMethods')();
module.exports = function (app, pool) {
    app.get("/api/scheduling/GetAll", function (req, res) {
        commonMethods.parseToken(pool, req, res, function () {
            pool.getConnection(function (err, connection) {
                // connected! (unless `err` is set)
                if (err) { res.send({ 'ResultCode': 202, 'details': undefined, 'ResultText': "No Network found!" }); return; };

                connection.query('SELECT * FROM hau_scheduling;', function (error, results, fields) {
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

    app.get("/api/scheduling/GetByID", function (req, res) {
        commonMethods.parseToken(pool, req, res, function () {
            pool.getConnection(function (err, connection) {
                // connected! (unless `err` is set)
                if (err) { res.send({ 'ResultCode': 202, 'details': undefined, 'ResultText': "No Network found!" }); return; };

                connection.query('SELECT * FROM hau_scheduling where TUSH_ID = ' + req.query['id'], function (error, results, fields) {
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

    app.get("/api/scheduling/GetByAPPLID", function (req, res) {
        commonMethods.parseToken(pool, req, res, function () {
            pool.getConnection(function (err, connection) {
                // connected! (unless `err` is set)
                if (err) { res.send({ 'ResultCode': 202, 'details': undefined, 'ResultText': "No Network found!" }); return; };

                connection.query('SELECT * FROM hau_scheduling where (TUSH_ISDELETED  is null or TUSH_ISDELETED = 0) and (TUSH_FROMDATE < now() and TUSH_TODATE > now()) and TUSH_DEV_ID = ' + req.query['id'], function (error, results, fields) {
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


    app.get("/api/scheduling/GetBySRID", function (req, res) {
        commonMethods.parseToken(pool, req, res, function () {
            pool.getConnection(function (err, connection) {
                // connected! (unless `err` is set)
                if (err) { res.send({ 'ResultCode': 202, 'details': undefined, 'ResultText': "No Network found!" }); return; };

                connection.query('SELECT * FROM hau_scheduling where (TUSH_ISDELETED  is null or TUSH_ISDELETED = 0) and (TUSH_FROMDATE < now() and TUSH_TODATE > now()) and TUSH_SR_ID = ' + req.query['id'], function (error, results, fields) {
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

    app.get("/api/scheduling/GetAllDropdownsByOrgId", function (req, res) {
        commonMethods.parseToken(pool, req, res, function () {
            pool.getConnection(function (err, connection) {
                // connected! (unless `err` is set)
                if (err) { res.send({ 'ResultCode': 202, 'details': undefined, 'ResultText': "No Network found!" }); return; };

                connection.query('select * from hau_sensors s inner join hau_boards b on b.BORD_ID = s.SR_BORD_ID inner join hau_rooms r on r.ROOM_ID = b.BORD_ROOM_ID where (s.SR_ISDELETED  is null or s.SR_ISDELETED = 0) AND (b.BORD_ISDELETED is null or b.BORD_ISDELETED = 0) AND (r.ROOM_ISDELETED is null or r.ROOM_ISDELETED = 0) AND r.ROOM_ENTT_ID =' + req.query['id'] + ';select * from hau_appliances a inner join hau_appliancestype t on a.APPL_TYPE = t.APTY_ID inner join hau_boards b on b.BORD_ID = a.APPL_BORD_ID inner join hau_rooms r on r.ROOM_ID = b.BORD_ROOM_ID where r.ROOM_ENTT_ID = ' + req.query['id'] + ';select * from hau_switchs s inner join hau_switchtypes t on t.SWTY_ID = s.SWIT_SWTY_ID inner join hau_boards b on b.BORD_ID = s.SWIT_BORD_ID inner join hau_rooms r on r.ROOM_ID = b.BORD_ROOM_ID where r.ROOM_ENTT_ID =' + req.query['id'] + ";", function (error, results, fields) {
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

    app.get("/api/scheduling/GetBySWITCHID", function (req, res) {
        commonMethods.parseToken(pool, req, res, function () {
            pool.getConnection(function (err, connection) {
                // connected! (unless `err` is set)
                if (err) { res.send({ 'ResultCode': 202, 'details': undefined, 'ResultText': "No Network found!" }); return; };

                connection.query('SELECT * FROM hau_scheduling where (TUSH_ISDELETED  is null or TUSH_ISDELETED = 0) and (TUSH_FROMDATE < now() and TUSH_TODATE > now()) and TUSH_SWIT_ID = ' + req.query['id'], function (error, results, fields) {
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

    app.post("/api/scheduling/postData", function (req, res) {
        commonMethods.parseToken(pool, req, res, function () {
            pool.getConnection(function (err, connection) {
                // connected! (unless `err` is set)
                if (err) { res.send({ 'ResultCode': 202, 'details': undefined, 'ResultText': "No Network found!" }); return; };
                var obj = req.body;

                var strString = commonMethods.PopulateProperties(obj);
                var strStringRes = commonMethods.PopulatePropertiesResults(obj);
                console.log(strString);
                if (req.body["TUSH_ID"]) {
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
                    req.body.TUSH_FROMDATE = commonMethods.GetDateToString(req.body.TUSH_FROMDATE);
                    req.body.TUSH_TODATE = commonMethods.GetDateToString(req.body.TUSH_TODATE);
                    req.body.TUSH_CREATEDDATE = commonMethods.GetDateToString(req.body.TUSH_CREATEDDATE);

                    connection.query('INSERT INTO hau_scheduling SET ?', req.body, function (error, results, fields) {
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
    });

}