import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../assets/back.png";
import "./Auth.css";
import logo from "./../assets/hydora.png";

export default function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok) {
      navigate("/home");
    } else {
      alert(data.msg);
    }
  };

  return (
    <div 
      className="auth-page"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="auth-box">

        
        <img src={logo} className="logo" />


        <h2>Login</h2>

        <input 
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <input 
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          LOGIN
        </button>

        <p
        className="link"
        onClick={() => navigate("/signup")}
        >
        New user? <span>Sign up</span>
        </p>

      </div>
    </div>
  );
}
