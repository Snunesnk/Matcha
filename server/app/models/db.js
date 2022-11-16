const mysql = require("mysql2");
const dbConfig = require("../config/db.config.js");

// Create a connection to the database
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
});

const connectWithRetry = () => {
    // open the MySQL connection
    connection.connect(error => {
        if (error) {
            console.log("Failed to connect to database, wll retry in 5 seconds");
            setTimeout(connectWithRetry, 5000)
        };
        console.log("Successfully connected to the database.");
    });
}
connectWithRetry();


module.exports = connection;