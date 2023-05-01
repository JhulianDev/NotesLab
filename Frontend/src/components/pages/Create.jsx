import { UserContext } from "../../context/UserContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { API_URL } from "../../env/env";
import { getToken } from "../../helpers/auth";
import Swal from "sweetalert2"
import imgIcon from "../../assets/img/image-icon.png"
import saveIcon from "../../assets/img/save-icon.png"
import deleteIcon from "../../assets/img/delete-icon.png"

const Create = () => {
  // Obtener datos del usuario desde el contexto UserContext
  const { userData } = useContext(UserContext);
  // Obtener función navigate de React Router para la navegación
  const navigate = useNavigate();
  // Obtener los parámetros de búsqueda de la URL
  const searchParams = new URLSearchParams(window.location.search);
  // Obtener el valor de "column_id" de los parámetros de búsqueda
  const columnId = searchParams.get("column_id");
  const [colorNote, setColorNote] = useState()
  const [colorHeader, setColorHeader] = useState()
  

  useEffect(() => {
    const noteHeader = document.querySelector('.create__header');
    const mainColor = document.querySelector('.create__color-main');
    const lightBlue = document.querySelector('.note__header--light-blue');
    const purple = document.querySelector('.note__header--purple');
    const red = document.querySelector('.note__header--red');
    const blue = document.querySelector('.note__header--blue');
    noteHeader.style.backgroundColor = colorHeader

    const showColors = () => {

      setTimeout(() => {
        lightBlue.style.display = "inline-block";
        lightBlue.style.animation = "showTheme .8s ease-in-out";
      }, 100);

      setTimeout(() => {
        purple.style.display = "inline-block";
        purple.style.animation = "showTheme .8s ease-in-out";
      }, 200);

      setTimeout(() => {
        red.style.display = "inline-block";
        red.style.animation = "showTheme .8s ease-in-out";
      }, 300);

      setTimeout(() => {
        blue.style.display = "inline-block";
        blue.style.animation = "showTheme .8s ease-in-out";
      }, 400);
    }

    const hideColors = () => {

      setTimeout(() => {
        lightBlue.style.display = "none";
      }, 800);

      setTimeout(() => {
        purple.style.display = "none";
      }, 600);

      setTimeout(() => {
        red.style.display = "none";
      }, 400);

      setTimeout(() => {
        blue.style.display = "none";
      }, 200);
    }

    mainColor.addEventListener("click", () => {
      showColors()
    })

    lightBlue.addEventListener("click", () => {
      setColorNote("light-blue")
      setColorHeader("var(--light-blue)")
      hideColors()
    })

    purple.addEventListener("click", () => {
      setColorNote("purple")
      setColorHeader("var(--pink)")
      hideColors()
    })

    red.addEventListener("click", () => {
      setColorNote("red")
      setColorHeader("var(--red)")
      hideColors()
    })

    blue.addEventListener("click", () => {
      setColorNote("blue")
      setColorHeader("var(--blue)")
      hideColors()
    })
  }, [userData, colorNote, colorHeader])

  // Función para manejar la creación de una nueva nota
  const handleCreate = (e) => {
    e.preventDefault();

    // Obtener los valores de los campos del formulario
    const data = {
      user_id: e.target.user_id.value,
      column_id: columnId,
      title: e.target.title.value,
      content: e.target.content.value,
      color: colorNote ? colorNote : "blue"
    };

    // Configurar los headers de la petición con el token de autorización
    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    };

    // Hacer una petición POST al endpoint de creación de notas con los datos del formulario
    axios.post(`${API_URL}/create`, data, config)
      .then(resp => {
        // Mostrar una alerta con el mensaje de respuesta y navegar a la página principal
        Swal.fire({
          icon: "success",
          title: "Created",
          text: "!Note created successfully!",
          showConfirmButton: false,
          timer: 1800
        })
        navigate("/");
      })
      .catch(error => {
        // Mostrar el error en la consola y una alerta con el mensaje de error de la respuesta
        console.log(error);
        alert(error.response.data.message);
      });
  }

  return (
    <div className="container-section-create">
      <form onSubmit={handleCreate} method="POST" className="create__form">
        <input type="text" id="user_id" value={userData ? userData.id : ""} readOnly hidden />
        <input id="color" name="color" defaultValue={colorNote} hidden />

        <div className="create__header" >
          <div className="create__box-icons">
            <img className="create__img" src={ imgIcon } alt="Image icon" />
            <div className="create__box-colors">
              <span className="create__color-main"></span>
              <span className="create__color note__header--light-blue"></span>
              <span className="create__color note__header--purple"></span>
              <span className="create__color note__header--red"></span>
              <span className="create__color note__header--blue"></span>
            </div>
          </div>
          <input type="text" className="create__title" name="title" placeholder="Tile note" maxLength="20" />
          <div className="create__box-icons">
            <input type="image" src={ saveIcon } alt="Edit icon" className="create__icon" />
            <Link to="/"><img src={ deleteIcon } alt="Delete icon" className="create__icon" /></Link>
          </div>
        </div>
        <div className="create__box-content">
          <textarea className="create__content" name="content" placeholder="Description of the note..."
            spellCheck="false" />
        </div>
      </form>
    </div>
  );
};

export default Create;