// Importamos MySql
const mysql = require("mysql2");

// Configuramos los valores de la base de datos
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
})

// Establecemos la conexión con la base de datos
connection.connect((error) => {
    if (error) {
        console.log("The database shows the following " + error);
    } else {
        console.log("The connection to the database has been successful.");
    }
});

// Exportamos el modulo de la base de datos
module.exports = connection;