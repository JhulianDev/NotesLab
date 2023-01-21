const express = require('express');
const router = express.Router();

// Importamos el controlador
const authController = require("../controllers/authController");

// Routers para las vistas
router.get("/", (req, res) => {
    res.render("index");
});

router.get("/login", (req, res) => {
    res.render("login", {alert:false});
});

router.get("/sign-up", (req, res) => {
    res.render("sign-up", {alert:false});
});


// Routers para los metodos del controller
// Controlador de registro
router.post("/sign-up", authController.register);

// Controlador de Login
router.post("/login", authController.login);




module.exports = router;