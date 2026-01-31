import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../assets/back.png";
import "./Auth.css";

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
      navigate("/dashboard");
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

        <p onClick={() => navigate("/signup")} className="link">
          Sign up
        </p>

      </div>
    </div>
  );
}
