import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./features/auth/login/login";
import Register from "./features/auth/register/register";
import Home from "./features/home/homepage";
import LoginGuard from "./shared/components/guards/loginGuard";
import AuthGuard from "./shared/components/guards/authGuard";
import Profile from "./features/profile/profile";
import NotFound from "./features/notFound/notFound";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          localStorage.getItem("token") &&
          localStorage.getItem("currentUser") ? (
            <Navigate to="/home" />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/login"
        element={
          <LoginGuard>
            <Login />
          </LoginGuard>
        }
      />
      <Route
        path="/register"
        element={
          <LoginGuard>
            <Register />
          </LoginGuard>
        }
      />
      <Route
        path="/home"
        element={
          <AuthGuard>
            <Home />
          </AuthGuard>
        }
      />
      <Route path="/profile" element={<Profile />} />
      <Route path="/notFound" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    //
  );
}

export default App;
