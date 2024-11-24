import React, { useState } from "react";
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";
import LeftBar from "./components/leftBar/LeftBar";
import LogoutPopup from "./components/logout/Logout"; // 引入 LogoutPopup 组件
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import CreatePost from "./pages/createPost/CreatePost";
import CreateEvent from "./pages/createEvent/CreateEvent";
import EventDetail from "./pages/eventDetail/eventDetail";
import EditEvent from "./pages/editEvent/EditEvent";
import EditProfile from "./pages/editProfile/EditProfile";
import MyEvent from "./pages/myEvent/MyEvent";
import Chat from "./pages/chat/Chat";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";

function App() {
  const currentUser = true; 
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  // Layout for protected routes
  const Layout = () => {
    return (
      <div className="flex overflow-hidden">
        <div className="flex w-full">
          {/* LeftBar fixed to the left side */}
          <div className="fixed left-0 top-0 h-full w-60 z-50">
            <LeftBar handleLogoutPopup={() => setShowLogoutPopup(true)} />
          </div>

          {/* Main Content area */}
          <div className="ml-60 w-full flex flex-col overflow-auto z-0">
            <Outlet />
          </div>
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

  const handleLogout = () => {
    console.log("Logged out!");
    setShowLogoutPopup(false);
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
        { path: "/", element: <Home /> },
        { path: "/profile", element: <Profile /> },
        { path: "/edit-profile", element: <EditProfile /> },
        { path: "/create-event", element: <CreateEvent /> },
        { path: "/edit-event/:id", element: <EditEvent /> },
        { path: "/event/:id", element: <EventDetail /> },
        { path: "/event/:id/chat", element: <Chat /> },
        { path: "/event/:id/create-post", element: <CreatePost /> },
        { path: "/my-event", element: <MyEvent /> }
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
  ]);

  return (
    <>
      {showLogoutPopup && (
        <LogoutPopup
          isOpen={showLogoutPopup}
          onClose={() => setShowLogoutPopup(false)}
          onLogout={handleLogout}
        />
      )}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
