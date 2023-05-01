import { API_URL } from "../../env/env";
import axios from "axios"
import { useContext } from "react";
import { useNavigate } from 'react-router-dom'
import { setToken } from "../../helpers/auth";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Swal from "sweetalert2"
import isotipo from "../../assets/img/isotipo.png"
import userIcon from "../../assets/img/user-icon.png"
import passIcon from "../../assets/img/password-icon.png"

const Login = () => { 
  const navigate = useNavigate()
  const { setUserData } = useContext(UserContext)

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = {
      user_name: e.target.user_name.value,
      password: e.target.password.value
    }

    axios.post(`${API_URL}/login`, data)
      .then(resp => {
        setToken(resp.data.token)

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "!Welcome to NotesLab!",
          showConfirmButton: false,
          timer: 1500
        })

        navigate("/")
        setUserData(resp.data.user)
      })
      .catch(error => {
        console.log(error)

        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${error.response.data.message}`
        })

        // alert(error.response.data.message)
      })
  }

  return (
    <div className="container-section-form">
      <form onSubmit={handleSubmit} id="form" method="POST" className="form">
        <img src={ isotipo } alt="isotipo" className="form__img" />

        <div className="form__box-input">
          <img src={ userIcon } alt="User icon" className="form__icons" />
          <input type="text" name="user_name" id="user_name" placeholder="User name" className="form__input" />
        </div>

        <div className="form__box-input">
          <img src={ passIcon } alt="Password icon" className="form__icons" />
          <input type="password" name="password" id="password" placeholder="Password" className="form__input" />
        </div>
        <button type="submit" id="log-in" value="Log in" className="form__button">Log in</button>
        <Link to="/sign-up" className="form__button form__button--color--margin">Sign up</Link>
      </form>
    </div>
  );
};

export default Login;

