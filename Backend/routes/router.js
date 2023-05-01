import express from 'express';
const router = express.Router();

// Controllers
import { register, login, getUser } from '../controllers/AuthController.js';
import { getNote, getAllNotes, createNote, updateNote, deleteNote } from "../controllers/NotesController.js";

// Middlewares
import { validateAuthorization } from "../middlewares/authMiddleware.js"

// Main path
router.get("/", (req, res) => {
    res.json("Welcome to NoteLab! This API is up and running.")
})

// Home
router.get("/api/home", validateAuthorization, getAllNotes);

// Login and Register
router.post("/api/login", login);
router.post("/api/register", register);

// Get User
router.get("/api/users", validateAuthorization, getUser);

// Get Note
router.get("/api/note/:id", validateAuthorization, getNote);
// Create note
router.post("/api/create", validateAuthorization, createNote)
// Update note
router.put("/api/update/:id", validateAuthorization, updateNote)
// Delete note
router.delete("/api/delete/note/:id", validateAuthorization, deleteNote)


export default router;

