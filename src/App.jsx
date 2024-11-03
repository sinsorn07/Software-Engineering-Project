import Login from "./Frontend/pages/login/Login";
import Register from "./Frontend/pages/register/Register";
import 
{
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Home from "./Frontend/pages/home/Home"
import Profile from "./Frontend/pages/profile/Profile"
import LeftBar from "./Frontend/components/leftBar/LeftBar";
import Navbar from "./Frontend/components/navbar/Navbar";
import RightBar from "./Frontend/components/rightBar/RightBar";


function App() 
{
  const currentUser = true;

  const Layout = ()=>
  {
    return(
      <div>
        <Navbar />
        <div style={{display: "flex" }}>
          <LeftBar />
          <Outlet />
          <RightBar />
        </div>
      </div>
    );
  };

  const ProtectedRoute = ({children}) =>
  {
    if(!currentUser)
    {
      return <Navigate to="/login"/>
    }

    return children;
  }

  const router = createBrowserRouter
  ([
    {
      path: "/",
      element: 
      (
        <ProtectedRoute>
          <Layout/>
        </ProtectedRoute>
      ),

      children: [
        {
          path: "/",
          element: <Home/>,
        },
        {
          path: "/profile/:id",
          element: <Profile/>
        }
      ]
    },

    {
      path: "/login",
      element: <Login/>,
    },

    {
      path: "/register",
      element: <Register/>,
    },
  ]);

  return(
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;