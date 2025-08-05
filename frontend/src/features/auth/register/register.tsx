import { useState, type ChangeEvent, type FormEvent } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import { registerApi } from "../../../shared/components/config/api";
//import type { AxiosResponse } from "axios";

export default function Register() {
  const [formData, setFormData] = useState({username: '', email: '', password: '', profession: '', location:''});
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    registerApi(formData).then(() => {
     // localStorage.setItem('token', res.data.token);
      //localStorage.setItem('currentUser', JSON.stringify(res.data.userData));
      navigate('/login');
    }
  ).finally(() => {
    setLoading(false);
  }
 )
}

  return (
    <div className="register-wrapper">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register</h2>
        <input onChange={handleChange} name="username" value={formData.username} placeholder="Username" type="text"/>
        <input onChange={handleChange} name="email" value={formData.email} placeholder="Email" type="email"/>
        <input onChange={handleChange} name="password" value={formData.password} placeholder="Password" type="password"/>
        <input onChange={handleChange} name="profession" value={formData.profession} placeholder="Profession" type="text"/> 
        <input onChange={handleChange} name="location" value={formData.location} placeholder="Location" type="text"/>
        <button type="submit">Sign Up</button>
        <p className="login-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  )
}

//remove confirm pass, 
//design,coding standard
