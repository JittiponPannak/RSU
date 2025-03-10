const mySQL = require("mysql2")

export const mySQLPool =  mySQL.createPool({
        host: "localhost"
    ,   user: "root"
    ,   database: "6606405_mydb"
    })