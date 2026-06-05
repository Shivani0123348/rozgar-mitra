import { useState } from "react";

function Login({ onLogin, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("https://rozgar-mitra.onrender.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("employer", JSON.stringify(data.employer));
        onLogin(data.employer);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Server se connect nahi ho pa raha");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f0f4f8", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ background: "white", padding: "40px", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", width: "360px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "8px" }}>🤝 Rozgar Mitra</h2>
        <p style={{ textAlign: "center", color: "#718096", marginBottom: "24px" }}>Employer Login</p>
        
        {error && <p style={{ color: "red", fontSize: "14px", marginBottom: "12px" }}>{error}</p>}
        
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #e2e8f0", marginBottom: "12px", boxSizing: "border-box" }}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #e2e8f0", marginBottom: "16px", boxSizing: "border-box" }}
        />
        <button
          onClick={handleLogin}
          style={{ width: "100%", padding: "12px", background: "linear-gradient(135deg, #1a1a2e, #16213e)", color: "white", border: "none", borderRadius: "8px", fontSize: "16px", cursor: "pointer" }}
        >
          Login
        </button>
        <p style={{ textAlign: "center", marginTop: "16px", fontSize: "14px", color: "#718096" }}>
        Account nahi hai? <span onClick={onRegister} style={{ color: "#667eea", cursor: "pointer" }}>Register karo</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
