import { API_URL } from "../../env/env";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom'
import useFetch from "../../hooks/useFetch";
import axios from "axios"
import { getToken } from "../../helpers/auth";
import { useEffect, useState } from "react";
import Swal from "sweetalert2"
import imgIcon from "../../assets/img/image-icon.png"
import saveIcon from "../../assets/img/save-icon.png"
import deleteIcon from "../../assets/img/delete-icon.png"

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, error, loading } = useFetch(`note/${id}`);
  const [colorNote, setColorNote] = useState()

  useEffect(() => {
    const noteHeader = document.querySelector('.create__header');
    const mainColor = document.querySelector('.create__color-main');
    const lightBlue = document.querySelector('.note__header--light-blue');
    const purple = document.querySelector('.note__header--purple');
    const red = document.querySelector('.note__header--red');
    const blue = document.querySelector('.note__header--blue');


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
    };

    if (mainColor) {
      
      mainColor.addEventListener("click", () => {
        showColors()
      })

      lightBlue.addEventListener("click", () => {
        noteHeader.classList.replace(`${noteHeader.classList[1]}`, "light-blue");
        setColorNote("light-blue")
        hideColors()
      })

      purple.addEventListener("click", () => {
        noteHeader.classList.replace(`${noteHeader.classList[1]}`, "purple");
        setColorNote("purple")
        hideColors()
      })

      red.addEventListener("click", () => {
        noteHeader.classList.replace(`${noteHeader.classList[1]}`, "red");
        setColorNote("red")
        hideColors()
      })

      blue.addEventListener("click", () => {
        noteHeader.classList.replace(`${noteHeader.classList[1]}`, "blue");
        setColorNote("blue")
        hideColors()
      })
    }
  }, [data, colorNote])

  if (loading) return <h1>CARGANDO...</h1>;
  if (error) return <h1>ERROR.</h1>;


  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedData = {
      id: e.target.id.value,
      user_id: e.target.user_id.value,
      column_id: e.target.column_id.value,
      title: e.target.title.value,
      content: e.target.content.value,
      color: colorNote
    }

    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    };

    axios.put(`${API_URL}/update/${id}`, updatedData, config)
      .then(resp => {
        Swal.fire({
          icon: "success",
          title: "Update",
          text: "!Note updated successfully!",
          showConfirmButton: false,
          timer: 1800
        })
        navigate("/");
      })
      .catch(error => {
        console.log(error);
        alert(error.response.data.message);
      });
  }

  return (

    <div className="container-section-create">
      <form onSubmit={handleUpdate} method="POST" className="create__form">
        <input type="text" id="user_id" value={data ? data.user_id : ""} readOnly hidden />
        <input id="color" name="color" value="purple" readOnly hidden />
        <input id="column_id" name="column_id" value="blue" readOnly hidden />

        <div className={`create__header ${data.color}`}>
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
          <input type="text" className="create__title" name="title" placeholder="Tile note" defaultValue={data ? data.title : ""} maxLength="20" />
          <div className="create__box-icons">
            <input type="image" src={ saveIcon } alt="Edit icon" className="create__icon" />
            <Link to="/"><img src={ deleteIcon } alt="Delete icon" className="create__icon" /></Link>
          </div>
        </div>
        <div className="create__box-content">
          <textarea className="create__content" name="content" placeholder="Description of the note..."
            spellCheck="false" defaultValue={data ? data.content : ""} />
        </div>
      </form>
    </div>
  );
};

export default Edit;