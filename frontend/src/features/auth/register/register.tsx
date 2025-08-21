import "./register.css";
import type { AxiosResponse } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerApi } from "../../../shared/components/config/api";

interface IRegisterForm {
  username: string;
  email: string;
  password: string;
  profession: string;
  location: string;
  employmentType: string;
}

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IRegisterForm>();

  const onSubmit = async (data: IRegisterForm) => {
    try {
      const res: AxiosResponse = await registerApi(data);

      console.log("Register response:", res.data);

      alert("Registered Successfully.");
      navigate("/login");
    } catch (error: any) {
      console.error("Register error:", error);
      alert(
        "Registration failed: " +
          (error?.response?.data?.message || "Something went wrong.")
      );
    } finally {
      reset();
    }
  };

  return (
    <div className="register-wrapper">
      <form onSubmit={handleSubmit(onSubmit)} className="register-form">
        <h2>Register</h2>

        {/* Username */}
        <input
          placeholder="Username"
          {...register("username", { required: "Username is required" })}
          type="text"
        />
        {errors.username && (
          <div className="error-text">
            {errors.username.message?.toString()}
          </div>
        )}

        {/* Email */}
        <input
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
          })}
          type="email"
        />
        {errors.email && (
          <div className="error-text">{errors.email.message?.toString()}</div>
        )}

        {/* Password */}
        <input
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
          type="password"
        />
        {errors.password && (
          <div className="error-text">
            {errors.password.message?.toString()}
          </div>
        )}

        {/* Profession */}
        <input
          placeholder="Profession"
          {...register("profession", { required: "Profession is required" })}
          type="text"
        />
        {errors.profession && (
          <div className="error-text">
            {errors.profession.message?.toString()}
          </div>
        )}

        {/* Location */}
        <input
          placeholder="Location"
          {...register("location", { required: "Location is required" })}
          type="text"
        />
        {errors.location && (
          <div className="error-text">
            {errors.location.message?.toString()}
          </div>
        )}

        {/* Employment Type (Dropdown) */}
        <select
          {...register("employmentType", {
            required: "Employment type is required",
          })}
          defaultValue=""
        >
          <option value="" disabled>
            Select Employment Type
          </option>
          <option value="Freelancer">Freelancer</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
        </select>
        {errors.employmentType && (
          <div className="error-text">
            {errors.employmentType.message?.toString()}
          </div>
        )}

        {/* Submit Button */}
        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Registering..." : "Sign Up"}
        </button>

        <p className="login-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
