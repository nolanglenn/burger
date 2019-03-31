// Import MySQL connection.
const connection = require("../config/connection.js");

function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
};

//Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}
// In the orm.js file, create the methods that will execute the necessary MySQL commands in the controllers. These are the methods you will need to use in order to retrieve and store data in your database.

// selectAll()
// insertOne()
// updateOne()
const orm = {
    // This method will select everything from the burgers table
    selectAll: function (tableName, cb) {
        let queryString = "SELECT * FROM " + tableName;
        connection.query(queryString, function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    insertOne: function (tableName, cols, vals, cb) {
        //INSERT INTO burgers (name, eaten) VALUES ("cheesebuger", false)
        //INSERT INTO burgers (name, eaten) VALUES (?, ?)

        let queryString = "INSERT INTO " + tableName + " (" + cols.toString() + ") VALUES (" + printQuestionMarks(vals.length) + ")";
        connection.query(queryString, vals, function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },

    updateOne: function (tableName, objColVals, condition, cb) {
        // UPDATE burgers SET eaten = true WHERE id = ?
        let queryString = "UPDATE " + tableName + " SET " + objToSql(objColVals) + " WHERE " + condition;
        connection.query(queryString, function (err, result) {
            if (err) throw err;
            cb(result);
        });
    }
};

// const orm = {
//     // This method will select everything from the burgers table
//     selectAll: function (tableInput, cb) {
//         let queryString = "SELECT * FROM ?";
//         connection.query(queryString, [tableInput], function (err, result) {
//             if (err) throw err;
//             cb(result);
//         });
//     },
//     insertOne: function (tableInput, colToSearch, valOfCol, cb) {
//         let queryString = "INSERT INTO ?? SET ?? = ?";
//         connection.query(queryString, [tableInput, colToSearch, valOfCol], function (err, result) {
//             if (err) throw err;
//             cb(result);
//         });
//     },
//     updateOne: function (tableInput, colToSearch, valOfCol, cb) {
//         let queryString = "UPDATE ?? SET ?? WHERE ?? = ?";
//         connection.query(queryString, [tableInput, colToSearch, valOfCol], function (err, result) {
//             if (err) throw err;
//             cb(result);
//         });
//     }
// };

module.exports = orm;