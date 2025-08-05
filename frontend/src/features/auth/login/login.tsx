
import { useState, type ChangeEvent, type FormEvent } from "react"
import "./login.css"
import type { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../../shared/components/config/api";

export default function Login(){
    const navigate = useNavigate();

    const [formData, setFormData] = useState({username: '', password:''})
    const [loading, setLoading] = useState(false)
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => { 
        const {name, value} = e.target;
        setFormData({...formData, [name]: value})
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (loading) {
            return;
        }
        
        setLoading(true);
        loginApi(formData).then((res: AxiosResponse) => {
            const token = res.data.token;
            const user = res.data.user;

            if(!token || !user) {
                alert("Login failed: Missing user data.");
                return;
            }

            localStorage.setItem('token',token);
            localStorage.setItem('currentUser', JSON.stringify(user));
            console.log("Logged in user:", user);
            navigate('/home');
        })
        .catch((error) => {
            console.error("Login error:", error);
            alert("Login failed.");
        })
        .finally(() => {
            setLoading(false);
        });
    //).catch{
      //  (error: AxiosError) => {
        //    const message = error.response?.data as String ?? 'Server Error'
          //  renderToStaticMarkup.error(message)
        //}
    //}
}
    return(
        <div className="login-wrapper">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>
                <input onChange={handleChange} name="username" value={formData.username} placeholder="Username" type="text"/>
                <input onChange={handleChange} name="password" value={formData.password} placeholder="Password" type="password"/>
                <button type="submit">Submit</button>
                <p className="register-text">
                    Don't have an account? <a href="/register">Register</a>
                </p>
            </form>
        </div>
    )

}

