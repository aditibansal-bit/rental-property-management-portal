import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();

  try {

    console.log(email);
    
    const response = await axios.post(
     "http://localhost:5000/api/auth/login",
      {
        email,
        password,
      }
    );

   localStorage.setItem("token", response.data.token);

localStorage.setItem(
  "user",
  JSON.stringify(response.data.user)
);

navigate("/dashboard");
  } catch (error) {
    console.log(error.response.data);
  }
};
  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="logo">
  Rental Property
  <br />
  Management Portal
</h1>

        <h2>Welcome Back</h2>

        <p className="subtitle">
          Sign in to access your account
        </p>

        <form className="login-form" onSubmit={handleLogin}>
          
        <label>Email Address</label>
<input
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

<label>Password</label>
<input
  type="password"
  placeholder="Enter your password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>
        
          <button type="submit">
            Login
          </button>
        </form>

        <p className="register-text">
          Don't have an account? <span>Register</span>
        </p>
      </div>
    </div>
  );
}

export default Login;