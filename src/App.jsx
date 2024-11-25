import React, { useContext } from "react";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import CreatePost from "./pages/createPost/CreatePost";
import CreateEvent from "./pages/createEvent/CreateEvent";
import EventDetail from "./pages/eventDetail/EventDetail";
import EditEvent from "./pages/editEvent/EditEvent";
import EditProfile from "./pages/editProfile/EditProfile";
import MyEvent from "./pages/myEvent/MyEvent";
import Chat from "./pages/chat/Chat";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import LeftBar from "./components/leftBar/LeftBar";
import { AuthContext } from "./context/authContext"; // Import AuthContext
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";

function App() {
  const { currentUser } = useContext(AuthContext); 

  const queryClient = new QueryClient()

  // Layout for protected routes
  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
      <div className="flex overflow-hidden">
        <div className="flex w-full">
          {/* LeftBar fixed to the left side */}
          <div className="fixed left-0 top-0 h-full w-60">
            <LeftBar />
          </div>

          {/* Main Content area */}
          <div className="ml-60 w-full flex flex-col overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>
      </QueryClientProvider>
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
        { path: "/event/:id", element: <EventDetail /> },
        { path: "/event/:id/chat", element: <Chat /> },        
        { path: "/event/:id/create-post", element: <CreatePost /> },
        { path: "/my-event", element: <MyEvent />}
        
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
