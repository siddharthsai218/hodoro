import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {

    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        email,
        password
      })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Signup successful!");
      navigate("/login");
    } else {
      alert(data.msg);
    }
  };

  return (
    <div className="auth-box">

      <input 
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      <input 
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input 
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={handleSignup}>
        SIGN UP
      </button>

    </div>
  );
}
