import { useEffect, useState } from "react"
import logoBlue from "../assets/img/logo-blue.png"
import logoPink from "../assets/img/logo-pink.png"
import bgBlue from "../assets/img/background-blue.png"
import bgPurple from "../assets/img/background-purple.png"
import avatarBlue from "../assets/img/avatar-blue.png"
import avatarPink from "../assets/img/avatar-pink.png"



const useTheme = () => {
  const [theme, setTheme] = useState("1")
  const [mainThemeColor, setMainThemeColor] = useState("var(--blue)")
  const [logo, setLogo] = useState(`${ logoBlue }`)
  const [avatar, setAvatar] = useState(`${avatarBlue}`);
  const [bgImage, setBgImage] = useState(`url(${ bgBlue })`)
  const body = document.querySelector("body");
  body.style.backgroundImage = bgImage

  useEffect(() => {
    if (theme === "1") {
      setTheme("1")
      setMainThemeColor("var(--blue)")
      setLogo(`${ logoBlue }`)
      setAvatar(`${ avatarBlue }`)
      setBgImage(`url(${bgBlue})`)
    } else if (theme === "2") {
      setTheme("2")
      setMainThemeColor("var(--pink)")
      setLogo(`${ logoPink }`)
      setAvatar(`${ avatarPink }`)
      setBgImage(`url(${bgPurple})`)
    }
  }, [theme])

  return { theme, mainThemeColor, setMainThemeColor, logo, avatar, setTheme, setLogo, setAvatar }
}

export default useTheme