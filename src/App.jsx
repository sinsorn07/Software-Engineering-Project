import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import CreatePost from "./pages/createPost/CreatePost";
import CreateEvent from "./pages/createEvent/CreateEvent";
import EditEvent from "./pages/editEvent/EditEvent";
import Chat from "./pages/Chat/Chat";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/EditProfile/EditProfile";
import LeftBar from "./components/leftBar/LeftBar";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";

function App() {
  const currentUser = true; // Simulating user authentication

  // Layout for protected routes
  const Layout = () => {
    return (
      <div className="flex h-screen overflow-hidden">
        {/* LeftBar fixed to the left side */}
        <div className="fixed left-0 top-0 h-full w-60">
          <LeftBar />
        </div>

        {/* Main Content area */}
        <div className="ml-60 w-full overflow-y-auto h-full">
          <Outlet />
        </div>
      </div>
    );
  };

  // Wrapper to handle protected routes
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  // Define router
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { path: "/", element: <Home /> },
        { path: "/profile", element: <Profile /> },
        { path: "/edit-profile", element: <EditProfile /> },
        { path: "/create-event", element: <CreateEvent /> },
        { path: "/edit-event", element: <EditEvent /> },
        { path: "/chat", element: <Chat /> },
        { path: "/create-post", element: <CreatePost /> },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
