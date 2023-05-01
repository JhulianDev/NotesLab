import { API_URL } from "../env/env";
import axios from "axios"
import { getToken } from "./auth";
import Swal from "sweetalert2"

// Distribuir notas del usuario en columnas
export const distributeNotes = (notes) => {
  // Crear un objeto vacio para almacenar las notas por columnas
  let columnNotes = {};
  // Crear un array vacio para almacenar el id de las columnas
  let columns = [];
  // Variable para almacenar el id más alto
  let maxColumnId = 0;
  // Variable para alacenar el id de la proxima columna a crear
  let nextColumnId = maxColumnId + 1;

  // Iterar sobre las notas
  for (let note of notes) {
    // comprobar si la columna de la nota ya existe en el objeto columnNotes
    if (!columnNotes[note.column_id]) {
      // si no existe, crear una nueva columna en el objeto columnNotes
      columnNotes[note.column_id] = [];
      // agregar la columna al array de columnas
      columns.push(note.column_id);
    }
    // agregar la nota a la columna correspondiente
    columnNotes[note.column_id].push(note);

    // Actualizar el id más alto si es necesario
    if (note.column_id > maxColumnId) {
      maxColumnId = note.column_id;
    }

    // Asignar el valor del id de la proxima columna a crear
    nextColumnId = maxColumnId + 1;
  }

  // Retornar el objeto columnNotes, el array de columnas y el id más alto
  return { columnNotes, columns, nextColumnId };
};

export const deleteNote = async (id) => {
  const confirmed = await Swal.fire({
    icon: "warning",
    title: "Sure?",
    text: "Are you sure you want to delete this note?",
    showDenyButton: true,
    denyButtonText: "No",
    confirmButtonText: "Yes"
  }).then((response) => {
    return response.isConfirmed;
  });

  if (confirmed) {
    try {
      await axios.delete(`${API_URL}/delete/note/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });
      Swal.fire({
        icon: "success",
        title: "Delete",
        text: "!The note has been deleted successfully!",
        showConfirmButton: false,
        timer: 1800
      })
      return true;
    } catch (error) {
      console.error('Error deleting note:', error);
      return false;
    }
  } else {
    return false;
  }
};



