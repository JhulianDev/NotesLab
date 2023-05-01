import { createBrowserRouter } from "react-router-dom"
import Home from "../components/pages/Home"
import Error404 from "../components/pages/Error404"
import MainHeaderTemplate from "../components/templates/MainHeaderTemplate"
import Login from "../components/pages/Login"
import SignUp from "../components/pages/SignUp"
import Create from "../components/pages/Create"
import Edit from "../components/pages/Edit"

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainHeaderTemplate />,
    errorElement: <Error404 />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/create",
        element: <Create />,
      },
      {
        path: "/edit/:id",
        element: <Edit />,
      }
    ]
  }
])

export default router