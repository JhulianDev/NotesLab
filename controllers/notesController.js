// Llamamos al modulo de conexion de la base de datos
const connection = require("../database/db");

// MOSTRAR NOTAS DEL USUARIO Y DISTRIBURILAS EN COLUMNAS
exports.processNotes = (notes) => {
    //crear un objeto vacío para almacenar las notas por columna
    let columnNotes = {};
    //crear un array vacío para almacenar las columnas
    let columns = [];
    //iterar sobre las notas
    for (let note of notes) {
        //verificar si la columna a la que pertenece la nota ya existe en el objeto columnNotes
        if (!columnNotes[note.column_id]) {
            //si no existe, crear una nueva columna en el objeto columnNotes
            columnNotes[note.column_id] = [];
            //agregar la columna al array de columnas
            columns.push(note.column_id);
        }
        //agregar la nota a la columna correspondiente
        columnNotes[note.column_id].push(note);
    }
    return { columnNotes, columns }
}

// CREAR NOTA EN NUEVA COLUMNA
exports.createNoteNewColumn = (req, res) => {
    // Recuperamos los valores del título, contenido y user_id de la petición
    const title = req.body.title;
    const content = req.body.content;
    const user_id = req.body.user_id;
    const color = req.body.color;

    // Realizamos una consulta SQL para obtener el valor máximo de column_id
    connection.query('SELECT MAX(column_id) FROM notes', (error, results) => {
        // Si hay un error, lo mostramos en la consola y devolvemos una respuesta con el error
        if (error) {
            console.log(error);
            return res.send(error);
        } else {
            // Tomamos el valor máximo de column_id y le sumamos 1
            const new_column = (results[0]['MAX(column_id)'] || 0) + 1;

            // Realizamos una inserción SQL para agregar una nueva nota
            connection.query("INSERT INTO notes SET ?", { title: title, content: content, user_id: user_id, column_id: new_column, color: color }, (error, results) => {
                // Si hay un error, lo mostramos en la consola
                if (error) {
                    console.log(error);
                } else {
                    // Si todo es correcto, redirigimos a la página principal y mostramos un mensaje de éxito
                    res.redirect("/");
                }
            });
        }
    });
}

// CREAR NOTA EN COLUMNA EXISTENTE
exports.createNoteExistingColumn = (req, res) => {
    // Recuperamos los valores del título, contenido y user_id de la petición
    const title = req.body.title;
    const content = req.body.content;
    const user_id = req.body.user_id;
    const column_id = req.body.column_id
    const color = req.body.color;
    
    // Realizamos una inserción SQL para agregar una nueva nota
    connection.query("INSERT INTO notes SET ?", { title: title, content: content, user_id: user_id, column_id: column_id, color: color }, (error, results) => {
        // Si hay un error, lo mostramos en la consola
        if (error) {
            console.log(error);
        } else {
            // Si todo es correcto, redirigimos a la página principal y mostramos un mensaje de éxito
            res.redirect("/");
        }
    });
}

// EDITAR NOTA
exports.updateNote = (req, res) => {
    // Recuperamos los valores del título, contenido y user_id de la petición
    const id = req.body.id;
    const title = req.body.title;
    const content = req.body.content;
    const user_id = req.body.user_id;
    const column_id = req.body.column_id
    const color = req.body.color;

    // Realizamos una inserción SQL para agregar actualizar la nota
    connection.query("UPDATE notes SET ? WHERE id = ?", [{title: title, content: content, user_id: user_id, column_id: column_id, color: color}, id], (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.redirect("/");
        }
    })
}

// ELIMINA NOTA
exports.deleteNote = (req, res) => {
    const note_id = req.params.id;

    connection.query("DELETE FROM notes WHERE id=?", [note_id], (error, results) => {
        if (error) {
            console.log("Error");
        } else {
            res.redirect("/");
        }
    })
}