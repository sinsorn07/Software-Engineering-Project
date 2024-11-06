import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import CreatePost from "./pages/createPost/CreatePost";
import CreateEvent from "./pages/createEvent/CreateEvent";
import EventDetail from "./pages/eventDetail/eventDetail";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import LeftBar from "./components/leftBar/LeftBar";
import Navbar from "./components/navbar/Navbar";

function App() {
  const currentUser = true;

  const Layout = () => {
    return (
      <div className="flex h-screen overflow-hidden">
        {/* Navbar fixed at the top */}
        <div className="fixed w-full z-10">
          <Navbar />
        </div>
        
        <div className="flex pt-16 w-full">
          {/* LeftBar fixed to the left side */}
          <div className="fixed left-0 top-16 h-full w-60">
            <LeftBar />
          </div>

          {/* Main Content area, scrollable */}
          <div className="ml-60 w-full overflow-y-auto h-full">
            <Outlet />
          </div>
        </div>
      </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/create-event",
          element: <CreateEvent />,
        },
        {
          path: "/create-post",
          element: <CreatePost />,
        },
        {
          path: "/event/:id",
          element: <EventDetail />,
        },               
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
