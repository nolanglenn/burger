// Import MySQL connection.
const connection = require("../config/connection.js");

const orm = {
    // This method will select everything from the burgers table
    selectAll: function (tableInput, cb) {
        let queryString = "SELECT * FROM ??";
        connection.query(queryString, [tableInput], function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    insertOne: function (tableInput, colToSearch, valOfCol, cb) {
        let queryString = "INSERT INTO ?? WHERE ?? = ?";
        connection.query(queryString, [tableInput, colToSearch, valOfCol], function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    updateOne: function (tableInput, colToSearch, valOfCol, cb) {
        let queryString = "UPDATE ?? SET ?? WHERE ?? = ?";
        connection.query(queryString, [tableInput, colToSearch, valOfCol], function (err, result) {
            if (err) throw err;
            cb(result);
        });
    }
};

module.exports = orm;