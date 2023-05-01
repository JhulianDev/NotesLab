import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";
import { API_URL } from "../../env/env";
import Swal from "sweetalert2"
import isotipo from "../../assets/img/isotipo.png"
import userIcon from "../../assets/img/user-icon.png"
import emailIcon from "../../assets/img/email-icon.png"
import passIcon from "../../assets/img/password-icon.png"

const SignUp = () => {
  const navigate = useNavigate()

  const handleSignUp = (e) => {
    e.preventDefault()

    const data = {
      user_name: e.target.user_name.value,
      email: e.target.email.value,
      password: e.target.password.value
    }

    axios.post(`${API_URL}/register`, data)
      .then(resp => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "!User Successfully Registered!",
          showConfirmButton: false,
          timer: 1500
        })
        navigate("/login")
      })
      .catch(error => {
        Swal.fire({
          icon: "info",
          title: "Attention",
          text: `${error.response.data.message}`,
          showConfirmButton: true
        })
      })
  }

  return (
    <div className="container-section-form">
      <form onSubmit={handleSignUp} id="form" method="POST" className="form" noValidate>
        <img src={ isotipo } alt="isotipo" className="form__img" />

        <div className="form__box-input">
          <img src={ userIcon } alt="User icon" className="form__icons" />
          <input type="text" name="user_name" id="user_name" placeholder="User name" className="form__input" />
        </div>

        <div className="form__box-input">
          <img src={ emailIcon } alt="Email icon" className="form__icons form__icons--width" />
          <input type="email" name="email" id="email" placeholder="Email address" className="form__input" />
        </div>

        <div className="form__box-input">
          <img src={ passIcon } alt="Password icon" className="form__icons" />
          <input type="password" name="password" id="password" placeholder="Password" className="form__input" />
        </div>

        <button type="submit" id="signUp" value="Sign up" className="form__button">Sign up</button>
        <Link to="/login" className="form__button form__button--color--margin">Log in</Link>
      </form>
    </div >
  );
};

export default SignUp;