const express = require('express');
const router = express.Router();
const _ = require('lodash');

// Llamamos al modulo de conexion de la base de datos
const connection = require("../database/db");

// Importamos el controlador de autenticación
const authController = require("../controllers/authController");

// Importamos el controlador de notas
const notesController = require("../controllers/notesController");

// Routers para las vistas
// Vista Dashboard
router.get("/", authController.userAuthenticated, (req, res) => {
    let user = req.user || {};
    let notes = req.user.notes || {};
    let { columnNotes, columns } = notesController.processNotes(notes);
    res.render("dashboard", {user: user, columnNotes: columnNotes, columns: columns});
});

// Vista Login
router.get("/login", (req, res) => {
    res.render("login", {alert:false});
});

// Vista Sign up
router.get("/sign-up", (req, res) => {
    res.render("sign-up", {alert:false});
});

// Vista Create-note
router.get("/create-note", authController.userAuthenticated, (req, res) => {
    let user = req.user || {};
    let column_id = req.query.column_id
    res.render("create-note", {user: user, column_id: column_id});
});

// Vista Create-column
router.get("/create-column", authController.userAuthenticated, (req, res) => {
    let user = req.user || {};
    res.render("create-column", {user: user});
});




// Routers para los metodos del controlador authController:
// Controlador de registro
router.post("/sign-up", authController.register);

// Controlador de Login
router.post("/login", authController.login);

// Controlador para el Logout
router.get("/logout", authController.logout);



// Routers para los metodos del controlador notesController:
// Crear nota en nueva columna
router.post("/createNoteNewColumn", notesController.createNoteNewColumn);

// Crear nota en columna existente
router.post("/createNoteExistingColumn", notesController.createNoteExistingColumn);

// Eliminar nota
router.get("/delete-note/:id", notesController.deleteNote);

// Editar nota
router.get("/edit-note/:id", authController.userAuthenticated, (req, res) => {
    let user = req.user || {};
    const note_id = req.params.id;

    connection.query("SELECT * FROM notes WHERE id=?", [note_id], (error, results) => {
        if (error) {
            console.log(error);
        } else {
            const note = results[0];
            res.render("edit-note", { note: note, user:user});
        }
    })
});

// Actualizar nota
router.post("/updateNote", notesController.updateNote);



module.exports = router;