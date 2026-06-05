import { useState } from "react";

function Register({ onRegister }) {
  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const res = await fetch("https://rozgar-mitra.onrender.com/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Registration successful! Ab login karo.");
        setError("");
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
        <p style={{ textAlign: "center", color: "#718096", marginBottom: "24px" }}>Employer Register</p>

        {error && <p style={{ color: "red", fontSize: "14px", marginBottom: "12px" }}>{error}</p>}
        {success && <p style={{ color: "green", fontSize: "14px", marginBottom: "12px" }}>{success}</p>}

        <input name="name" placeholder="Aapka Naam" value={form.name} onChange={handleChange}
          style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #e2e8f0", marginBottom: "12px", boxSizing: "border-box" }} />
        
        <input name="company" placeholder="Company ka Naam" value={form.company} onChange={handleChange}
          style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #e2e8f0", marginBottom: "12px", boxSizing: "border-box" }} />
        
        <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange}
          style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #e2e8f0", marginBottom: "12px", boxSizing: "border-box" }} />
        
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange}
          style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #e2e8f0", marginBottom: "12px", boxSizing: "border-box" }} />
        
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange}
          style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #e2e8f0", marginBottom: "16px", boxSizing: "border-box" }} />

        <button onClick={handleRegister}
          style={{ width: "100%", padding: "12px", background: "linear-gradient(135deg, #1a1a2e, #16213e)", color: "white", border: "none", borderRadius: "8px", fontSize: "16px", cursor: "pointer" }}>
          Register
        </button>

        <p style={{ textAlign: "center", marginTop: "16px", fontSize: "14px", color: "#718096" }}>
          Pehle se account hai? <a href="/" style={{ color: "#667eea" }}>Login karo</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
