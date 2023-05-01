import { useContext, useEffect } from "react";
import { deleteToken, getToken } from "../../helpers/auth";
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import useTheme from "../../hooks/useTheme";
import logOutIcon from "../../assets/img/logout-icon.png"

const MainHeader = () => {
  const navigate = useNavigate()
  const { userData, setUserData } = useContext(UserContext)
  const { mainThemeColor, setMainThemeColor, setTheme, logo, avatar } = useTheme()


  const handleSession = () => {
    deleteToken()
    setTheme("1")
    navigate("/login")
    setUserData()
  }

  useEffect(() => {
    if (userData) {
      const mainTheme = document.querySelector('.header__theme-main');
      const pinkTheme = document.querySelector('.header__theme--pink');
      const blueTheme = document.querySelector('.header__theme--blue');
      setTheme(localStorage.getItem(`theme-user:${userData.id}`) || "1")
      mainTheme.style.backgroundColor = mainThemeColor

      const showThemes = () => {
        setTimeout(() => {
          blueTheme.style.display = "inline-block"
          blueTheme.style.marginRight = "10px";
          blueTheme.style.animation = "showTheme .8s ease-in-out";
        }, 100);
        setTimeout(() => {
          pinkTheme.style.display = "inline-block"
          pinkTheme.style.marginRight = "10px";
          pinkTheme.style.animation = "showTheme .8s ease-in-out";
        }, 200);
      }

      const hideThemes = () => {
        setTimeout(() => {
          blueTheme.style.display = "none"
        }, 200);
        setTimeout(() => {
          pinkTheme.style.display = "none"
        }, 400);
      }

      mainTheme.addEventListener("click", () => {
        showThemes()
      })

      blueTheme.addEventListener("click", () => {
        hideThemes()
        setMainThemeColor("var(--blue)")
        localStorage.setItem(`theme-user:${userData.id}`, "1");
        setTheme("1")
      })

      pinkTheme.addEventListener("click", () => {
        hideThemes();
        setMainThemeColor("var(--pink)")
        localStorage.setItem(`theme-user:${userData.id}`, "2");
        setTheme("2")
      })
    }
  }, [userData, mainThemeColor]);

  return (
    <header className="header">
      <div className="header__box">
        <Link to="/" className="header__logo-link">
          <img src={logo} alt="Logo NotesLab" className="header__logo" />
        </Link>

        <div className="header__box-login-user">
          {
            !getToken() ? (
              <>
                <Link to="/login" className="header__log-in">Log in</Link>
                <Link to="/sign-up" className="header__sign-in">Sign up</Link>
              </>
            ) : (
              <>
                <span className="header__theme header__theme--blue"></span>
                <span className="header__theme header__theme--pink"></span>
                <span className="header__theme-main"></span>
                <h1 className="header__user-name">{userData ? userData.user_name : ""}</h1>
                <a onClick={handleSession} type="button">
                  <img src={ logOutIcon } alt="Log out icon" className="header__logout-icon" />
                </a>
              </>
            )
          }
          <img src={avatar} alt="Avatar User" className="header__avatar-user" />
        </div>
      </div>
    </header>
  );
};

export default MainHeader;