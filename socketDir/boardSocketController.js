var commonMethods = require('../controllers/commonMethods')();

module.exports = function(socket, pool, io) {
    socket.on("boards_GetAll", function(data) {
        pool.getConnection(function(err, connection) {
            // connected! (unless `err` is set)
            if (err) { socket.emit("Network Error", {
                'ResultCode': 202,
                'details': undefined,
                'ResultText': "No Network found!"
            });
             return; };

            connection.query('SELECT * FROM hau_boards;', function(error, results, fields) {
                // And done with the connection.
                connection.release();

                // Handle error after the release.
                if (error) { socket.emit("Network Error", {
                    'ResultCode': 202,
                    'details': undefined,
                    'ResultText': "No Network found!"
                });
                 return; };

                // Don't use the connection here, it has been returned to the pool.
                // res.send({ 'ResultCode': 200, 'details': results, 'ResultText': "" });
                socket.emit("boards_GetAll", { 'ResultCode': 200, 'details': results, 'ResultText': "" });
            });
        });
    });
    socket.on("boards_GetByID", function(data) {
        pool.getConnection(function(err, connection) {
            // connected! (unless `err` is set)
            if (err) { socket.emit("Network Error", {
                'ResultCode': 202,
                'details': undefined,
                'ResultText': "No Network found!"
            });
             return; };

            connection.query('SELECT * FROM hau_boards where BORD_ID = ' + data['id'], function(error, results, fields) {
                // And done with the connection.
                connection.release();

                // Handle error after the release.
                if (error) { socket.emit("Network Error", {
                    'ResultCode': 202,
                    'details': undefined,
                    'ResultText': "No Network found!"
                });
                 return; };

                // Don't use the connection here, it has been returned to the pool.
                socket.emit("boards_GetByID", { 'ResultCode': 200, 'details': results, 'ResultText': "" });
            });
        });

    });

    
    socket.on("boards_GetAllByRoomId", function(data) {
        pool.getConnection(function(err, connection) {
            // connected! (unless `err` is set)
            if (err) { socket.emit("Network Error", {
                'ResultCode': 202,
                'details': undefined,
                'ResultText': "No Network found!"
            });
             return; };

             connection.query('SELECT * FROM hau_boards where (BORD_ISDELETED is null or BORD_ISDELETED = 0) and BORD_ROOM_ID = ' + data.BORD_ROOM_ID, function (error, results, fields) {
                // And done with the connection.
                connection.release();

                // Handle error after the release.
                if (error) { 
                    socket.emit("Network Error", {
                    'ResultCode': 202,
                    'details': undefined,
                    'ResultText': "No Network found!"
                });
                 return; };

                // Don't use the connection here, it has been returned to the pool.
                socket.emit("boards_GetAllByRoomId", { 'ResultCode': 200, 'details': results, 'ResultText': "" });
            });
        });

    });

    socket.on("boards_postData", function(data) {
        pool.getConnection(function(err, connection) {
            // connected! (unless `err` is set)
            if (err) { socket.emit("Network Error", {
                'ResultCode': 202,
                'details': undefined,
                'ResultText': "No Network found!"
            });
             return; };
            var obj = data;

            var strString = commonMethods.PopulatePropertiesForSocket(obj, "BORD_");
            var strStringRes = commonMethods.PopulatePropertiesResultsForSocket(obj, "BORD_");
            console.log(strString);
            if (data["BORD_ID"]) {
                connection.query('UPDATE hau_boards SET ' + strString, strStringRes, function(error, results, fields) {
                    // And done with the connection.
                    connection.release();

                    // Handle error after the release.
                    if (error) { socket.emit("Network Error", {
                        'ResultCode': 202,
                        'details': undefined,
                        'ResultText': "No Network found!"
                    });
                     return; };

                    // Don't use the connection here, it has been returned to the pool.
                    // res.send({'ResultCode': 200,'details': results.changedRows,'ResultText': ""});
                    socket.emit("boards_postData", results.changedRows.toString());
                });
            } else {
                connection.query('INSERT INTO hau_boards SET ?', data, function(error, results, fields) {
                    // And done with the connection.
                    connection.release();

                    // Handle error after the release.
                    if (error) { socket.emit("Network Error", {
                        'ResultCode': 202,
                        'details': undefined,
                        'ResultText': "No Network found!"
                    });
                     return; };

                    // Don't use the connection here, it has been returned to the pool.
                    // res.send({'ResultCode': 200,'details': results.insertId,'ResultText': ""});
                    socket.emit("boards_postData", results.insertId.toString());
                });
            }
        });

    });


}