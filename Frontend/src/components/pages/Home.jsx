import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import { deleteNote, distributeNotes } from "../../helpers/notes";
import editIcon from "../../assets/img/edit-icon.png"
import deleteIcon from "../../assets/img/delete-icon.png"
import addIcon from "../../assets/img/add-icon.png"

const Home = () => {
  const { data, error, loading, setData } = useFetch("home");

  if (loading) return <h1>CARGANDO...</h1>;
  if (error) return <h1>ERROR.</h1>;

  const { columnNotes, columns, nextColumnId } = distributeNotes(data);

  const handleDeleteNote = async (id) => {
    try {
      const result = await deleteNote(id);
      if (result) {
        // Si la eliminación tuvo éxito, actualizar el estado de las notas después de la eliminación
        // Aquí puedes usar la función setData de tu hook useFetch para actualizar el estado de las notas
        setData((prevData) => {
          // Filtrar la nota eliminada del estado anterior
          const updatedData = prevData.filter((note) => note.id !== id);
          return updatedData;
        });
      }
    } catch (error) {
      // Manejar errores si es necesario
      console.error('Error deleting note:', error);
    }
  };
  
  return (
    <div>
      <div className="dashboard__blur blur-left"></div>
      <div className="dashboard__blur blur-right"></div>
      <div className="dashboard">


        {columns.map((column_id) => (
          <div key={column_id} className="dashboard__column-notes">
            <div className="dashboard__box-scroll-notes">
              {columnNotes[column_id].map((note) => (
                <div key={note.id} className="dashboard__note">
                  <div
                    className={`note__header note__header--${note.color}`}
                  >
                    <h1 className="note__title">{note.title}</h1>
                    <div className="note__box-icons">
                      <Link to={`/edit/${note.id}`}>
                        <img
                          src={ editIcon }
                          alt="Edit icon"
                          className="note__icon"
                        />
                      </Link>

                      <Link onClick={() => handleDeleteNote(note.id)}>
                        <img
                          src={ deleteIcon }
                          alt="Delete icon"
                          className="note__icon"
                        />
                      </Link>
                    </div>
                  </div>

                  <div className="note__contents">
                    <p className="note__p">{note.content}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              to={`/create?column_id=${column_id}`}
              className="dashboard__add-note"
            >
              <img
                src={ addIcon }
                alt="Add note icon"
                className="dashboard__add-icon"
              />
              <h2 className="dashboard__add-text">New note</h2>
            </Link>
          </div>
        ))}

        <Link to={`/create?column_id=${nextColumnId}`} className="dashboard__add-column">
          <img src={ addIcon } alt="Add note icon" className="dashboard__add-icon" />
          <h2 className="dashboard__add-text">New note</h2>
        </Link>
      </div>
    </div>

  );
};

export default Home;

