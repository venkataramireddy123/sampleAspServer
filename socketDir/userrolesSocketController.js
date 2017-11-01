var commonMethods = require('../controllers/commonMethods')();

module.exports = function (socket, pool, io) {
    socket.on("userroles_SelectAll", function (data) {
        pool.getConnection(function (err, connection) {
            // connected! (unless `err` is set)
            if (err) {
                socket.emit("Network Error", {
                    'ResultCode': 202,
                    'details': undefined,
                    'ResultText': "No Network found!"
                });
            return;};

            connection.query('SELECT * FROM hau_userroles;', function (error, results, fields) {
                // And done with the connection.
                connection.release();

                // Handle error after the release.
                if (error) {
                    socket.emit("Network Error", {
                        'ResultCode': 202,
                        'details': undefined,
                        'ResultText': "No Network found!"
                    });
            return;};

                // Don't use the connection here, it has been returned to the pool.
                // res.send({ 'ResultCode': 200, 'details': results, 'ResultText': "" });
                socket.emit("userroles_SelectAll",{ 'ResultCode': 200, 'details': results, 'ResultText': "" });
            });
        });


    });
    socket.on("userroles_GetByID", function (data) {
        pool.getConnection(function (err, connection) {
            // connected! (unless `err` is set)
            if (err) {
                socket.emit("Network Error", {
                    'ResultCode': 202,
                    'details': undefined,
                    'ResultText': "No Network found!"
                });
            return;};

            connection.query('SELECT * FROM hau_userroles where USRE_ID = ' + data['id'], function (error, results, fields) {
                // And done with the connection.
                connection.release();

                // Handle error after the release.
                if (error) {
                    socket.emit("Network Error", {
                        'ResultCode': 202,
                        'details': undefined,
                        'ResultText': "No Network found!"
                    });
            return;};

                // Don't use the connection here, it has been returned to the pool.
            socket.emit("userroles_GetByID", { 'ResultCode': 200, 'details': results, 'ResultText': "" });
            });
        });

    });

    socket.on("userroles_postData", function (data) {
        pool.getConnection(function (err, connection) {
            // connected! (unless `err` is set)
            if (err) {
                socket.emit("Network Error", {
                    'ResultCode': 202,
                    'details': undefined,
                    'ResultText': "No Network found!"
                });
            return;};
            var obj = data;

            var strString = commonMethods.PopulateProperties(obj);
            var strStringRes = commonMethods.PopulatePropertiesResults(obj);
            console.log(strString);
            if (data["USRE_ID"]) {
                connection.query('UPDATE hau_userroles SET ' + strString, strStringRes, function (error, results, fields) {
                    // And done with the connection.
                    connection.release();

                    // Handle error after the release.
                    if (error) {
                        socket.emit("Network Error", {
                            'ResultCode': 202,
                            'details': undefined,
                            'ResultText': "No Network found!"
                        });
            return;};

                    // Don't use the connection here, it has been returned to the pool.
                    // res.send({'ResultCode': 200,'details': results.changedRows,'ResultText': ""});
                    socket.emit("userroles_postData", results.changedRows.toString());
                });
            }
            else {
                connection.query('INSERT INTO hau_userroles SET ?', data, function (error, results, fields) {
                    // And done with the connection.
                    connection.release();

                    // Handle error after the release.
                    if (error) {
                        socket.emit("Network Error", {
                            'ResultCode': 202,
                            'details': undefined,
                            'ResultText': "No Network found!"
                        });
            return;};

                    // Don't use the connection here, it has been returned to the pool.
                    // res.send({'ResultCode': 200,'details': results.insertId,'ResultText': ""});
                    socket.emit("userroles_postData", results.insertId.toString());
                });
            }
        });

    });


}