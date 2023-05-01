import NotesModel from "../models/NotesModel.js"

// Mostrar todas las notas correspondientes al usuario
export const getAllNotes = async (req, res) => {
    try {
        let notes = await NotesModel.findAll({ where: { user_id: req.user.id } });
        res.json(notes);
    } catch (error) {
        res.json({message: "Error getting user notes"})
    }
}

// Mostrar nota mediante id
export const getNote = async (req, res) => {
    try {
        let note = await NotesModel.findAll({where: { id: req.params.id}});
        if (note < 1) {
            res.json({message: "There is no note with the provided id"})
        } else {
            res.json(note[0]);
        }
    } catch (error) {
        res.json({message: "Error getting note"})
    }
}

// Crear nota 
export const createNote = async (req, res) => {
    try {
        const { user_id, column_id, title, content, color } = req.body;
        // const newColumn = ((await NotesModel.max("column_id")) ?? 0) + 1;

        let note = await NotesModel.create({
            user_id,
            column_id,
            title,
            content,
            color
        });

        res.status(201).json({
            message: "The note was created successfully!",
            note
        });
    } catch (error) {
        console.log(`An error occurred while trying to create the note: ${error}`)
        res.status(500).json(`An error occurred while trying to create the note`)
    }
};

// Actualizar una Nota
export const updateNote = async (req, res) => {
    try {
        const { userId, columnId, title, content, color } = req.body;

        let note = await NotesModel.update({
            userId,
            columnId,
            title,
            content,
            color,
        }, {
            where: {id: req.params.id},
            returning: true
        });
        res.status(200).json({
            message: "The note was updated successfully!"
        })
    } catch (error) {
        console.log(`An error occurred while trying to update the note: ${error}`)
        res.status(500).json(`An error occurred while trying to update the note`)
    }
}

// Eliminar una Nota
export const deleteNote = async (req, res) => {
    try {
        await NotesModel.destroy({
            where: { id: req.params.id }
        })
        res.status(200).json({
            message: "The note was deleted successfully!"
        })
    } catch (error) {
        console.log(`An error occurred while trying to delete the note: ${error}`)
        res.status(500).json(`An error occurred while trying to delete the note`)
    }
}