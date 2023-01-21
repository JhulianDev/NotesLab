const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 3000;

// Seteamos el motor de plantillas
app.set("view engine", "ejs");

// Seteamos la carpeta Public para archivos estaticos
app.use(express.static("public"));

// Seteamos urlencoded para capturar los datos enviados desde el front.
// Indicamos en que formato se manejaran dichos datos (JSON).
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// Seteamos la ubicacion de las variables de entorno
dotenv.config({path: "./env/.env"});

// Seteamos el manejador de las cookies
app.use(cookieParser());

// Llamamos al Router
app.use("/", require("./routes/router"));

// Activamos el servidor
app.listen(port, () => {
    console.clear();
    console.log(`Active server on port ${port}...`)
});