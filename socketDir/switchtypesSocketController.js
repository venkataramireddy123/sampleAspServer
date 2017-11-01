var commonMethods = require('../controllers/commonMethods')();

module.exports = function (socket, pool, io) {
    socket.on("switchtypes_SelectAll", function (data) {
        pool.getConnection(function (err, connection) {
            // connected! (unless `err` is set)
            if (err) {
                socket.emit("Network Error", {
                    'ResultCode': 202,
                    'details': undefined,
                    'ResultText': "No Network found!"
                });
            return;};

            connection.query('SELECT * FROM hau_switchtypes;', function (error, results, fields) {
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
                socket.emit("switchtypes_SelectAll",{ 'ResultCode': 200, 'details': results, 'ResultText': "" });
            });
        });


    });
    socket.on("switchtypes_GetByID", function (data) {
        pool.getConnection(function (err, connection) {
            // connected! (unless `err` is set)
            if (error) {
                socket.emit("Network Error", {
                    'ResultCode': 202,
                    'details': undefined,
                    'ResultText': "No Network found!"
                });
            return;};

            connection.query('SELECT * FROM hau_switchtypes where SWTY_ID = ' + data['id'], function (error, results, fields) {
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
            socket.emit("switchtypes_GetByID", { 'ResultCode': 200, 'details': results, 'ResultText': "" });
            });
        });

    });

    socket.on("switchtypes_postData", function (data) {
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
            if (data["SWTY_ID"]) {
                connection.query('UPDATE hau_switchtypes SET ' + strString, strStringRes, function (error, results, fields) {
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
                    socket.emit("switchtypes_postData", results.changedRows.toString());
                });
            }
            else {
                connection.query('INSERT INTO hau_switchtypes SET ?', data, function (error, results, fields) {
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
                    socket.emit("switchtypes_postData", results.insertId.toString());
                });
            }
        });

    });


}