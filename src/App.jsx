import React, { useState, useContext } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContext } from "./context/authContext"; // AuthContext for authentication
import LeftBar from "./components/leftBar/LeftBar";
import LogoutPopup from "./components/logout/Logout"; // Logout popup component
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import CreatePost from "./pages/createPost/CreatePost";
import EditPost from "./components/editPost/EditPost";
import CreateEvent from "./pages/createEvent/CreateEvent";
import EventDetail from "./pages/eventDetail/eventDetail";
import EditEvent from "./pages/editEvent/EditEvent";
import EditProfile from "./pages/EditProfile/EditProfile";
import MyEvent from "./pages/myEvent/MyEvent";
import Chat from "./pages/chat/Chat";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";

function App() {
  const { currentUser } = useContext(AuthContext); // Use AuthContext for current user
  const [showLogoutPopup, setShowLogoutPopup] = useState(false); // Manage logout popup state
  const queryClient = new QueryClient(); // Initialize React Query client

  // Layout for protected routes
  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div className="flex overflow-hidden">
          <div className="flex w-full">
            {/* LeftBar fixed to the left side */}
            <div className="fixed left-0 top-0 h-full w-60 z-50">
            <LeftBar
              key={currentUser?.username || currentUser?.profilePic || "default"}
              handleLogoutPopup={() => setShowLogoutPopup(true)}/>
            </div>


            {/* Main Content area */}
            <div className="ml-60 w-full flex flex-col overflow-auto z-0">
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

  // Handle logout
  const handleLogout = () => {
    console.log("Logged out!");
    setShowLogoutPopup(false);
  };

  // Define routes
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
        { path: "/profile/:userId", element: <Profile /> }, // Updated route
        { path: "/edit-profile/:userId", element: <EditProfile /> },
        { path: "/create-event", element: <CreateEvent /> },
        { path: "/edit-event/:eventId", element: <EditEvent /> },
        { path: "/event/:eventId", element: <EventDetail /> },
        { path: "/event/:eventId/chat", element: <Chat /> },
        { path: "/event/:eventId/create-post", element: <CreatePost /> },
        { path: "/posts/:postId/edit-post", element: <EditPost /> },
        { path: "/my-event", element: <MyEvent /> },
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
