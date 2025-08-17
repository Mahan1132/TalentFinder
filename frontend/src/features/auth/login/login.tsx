import "./login.css";
import type { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../../shared/components/config/api";
import { useForm } from "react-hook-form";

interface ILoginForm {
  username: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ILoginForm>();

  const onSubmit = async (data: ILoginForm) => {
    try {
      const res: AxiosResponse = await loginApi(data);

      console.log("Login response:", res.data); //check backend payload here

      const token = res.data.token;
      const user = res.data.user || res.data.userData || null;

      if (!token || !user) {
        alert("Login failed: Missing user data.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("currentUser", JSON.stringify(user));

      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed.");
    } finally {
      reset();
    }
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <h2>Login</h2>

        {/* Username field */}
        <input
          id="username"
          placeholder="Username"
          {...register("username", { required: "Username is required" })}
          type="text"
        />
        {errors.username && (
          <div className="error-text">
            {errors.username.message?.toString()}
          </div>
        )}

        {/* Password field */}
        <input
          id="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
          type="password"
        />
        {errors.password && (
          <div className="error-text">
            {errors.password.message?.toString()}
          </div>
        )}

        {/* Submit Button */}
        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        <p className="register-text">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
}
