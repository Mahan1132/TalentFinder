import { useState, type ChangeEvent, type FormEvent } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import { registerApi } from "../../../shared/components/config/api";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    profession: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    // localStorage.setItem('token', res.data.token);
    //localStorage.setItem('currentUser', JSON.stringify(res.data.userData));

    const { username, email, password, profession, location } = formData;
    if (!username || !email || !password || !profession || !location) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    setLoading(true);

    registerApi(formData)
      .then(() => {
        alert("Registered Successfully.");
        navigate("/login");
      })
      .catch((error) => {
        alert(
          "Registration failed: " +
            (error?.response?.data?.message || "Something went wrong.")
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="register-wrapper">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register</h2>
        <input
          onChange={handleChange}
          name="username"
          value={formData.username}
          placeholder="Username"
          type="text"
        />
        <input
          onChange={handleChange}
          name="email"
          value={formData.email}
          placeholder="Email"
          type="email"
        />
        <input
          onChange={handleChange}
          name="password"
          value={formData.password}
          placeholder="Password"
          type="password"
        />
        <input
          onChange={handleChange}
          name="profession"
          value={formData.profession}
          placeholder="Profession"
          type="text"
        />
        <input
          onChange={handleChange}
          name="location"
          value={formData.location}
          placeholder="Location"
          type="text"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Sign Up"}
        </button>
        <p className="login-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
