import { useState, useEffect } from "react";
import Login from "./login";
import Register from "./register";

function App() {
  const [employer, setEmployer] = useState(null);
  const [page, setPage] = useState("login");
  const [workers, setWorkers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("employer");
    const token = localStorage.getItem("token");
    if (saved && token) {
      setEmployer(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (employer) {
      const token = localStorage.getItem("token");
      fetch("https://rozgar-mitra.onrender.com/workers", {
        headers: { Authorization: `Bearer ${token}` },
      })      
        .then((res) => res.json())
        .then((data) => setWorkers(Array.isArray(data) ? data : []))
        .catch(() => {});
    }
  }, [employer]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("employer");
    setEmployer(null);
    setPage("login");
  };

  const filtered = workers.filter((w) =>
    w.skill?.toLowerCase().includes(filter.toLowerCase())
  );

  if (!employer) {
    if (page === "register") return <Register onRegister={() => setPage("login")} />;
   return <Login onLogin={(emp) => setEmployer(emp)} onRegister={() => setPage("register")} />;;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f0f4f8", fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1a1a2e, #16213e)", padding: "24px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ color: "white", margin: 0, fontSize: "26px" }}>🤝 Rozgar Mitra</h1>
          <p style={{ color: "#a0aec0", margin: "4px 0 0", fontSize: "14px" }}>Welcome, {employer.name} — {employer.company}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ background: "#25D366", borderRadius: "20px", padding: "8px 20px", color: "white", fontSize: "14px", fontWeight: "bold" }}>
            {workers.length} Workers
          </div>
          <button onClick={handleLogout} style={{ background: "transparent", border: "1px solid #a0aec0", color: "#a0aec0", padding: "8px 16px", borderRadius: "8px", cursor: "pointer" }}>
            Logout
          </button>
        </div>
      </div>

      {/* Search */}
      <div style={{ padding: "30px 40px 10px" }}>
        <input
          placeholder="🔍 Search by skill — painter, plumber, electrician..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ width: "100%", padding: "14px 20px", borderRadius: "12px", border: "2px solid #e2e8f0", fontSize: "16px", boxSizing: "border-box", outline: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
        />
      </div>

      {/* Cards */}
      <div style={{ padding: "20px 40px", display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {filtered.length === 0 ? (
          <div style={{ width: "100%", textAlign: "center", padding: "60px", color: "#718096" }}>
            <p style={{ fontSize: "48px" }}>👷</p>
            <p style={{ fontSize: "18px" }}>Koi worker nahi mila!</p>
          </div>
        ) : (
          filtered.map((w, i) => (
            <div key={i} style={{ background: "white", borderRadius: "16px", padding: "20px", width: "260px", boxShadow: "0 4px 15px rgba(0,0,0,0.08)", border: "1px solid #e2e8f0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "linear-gradient(135deg, #667eea, #764ba2)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold", fontSize: "20px" }}>
                  {w.name?.[0]?.toUpperCase() || "?"}
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: "16px" }}>{w.name || "Unknown"}</h3>
                  <span style={{ background: "#ebf8ff", color: "#2b6cb0", padding: "2px 8px", borderRadius: "10px", fontSize: "12px" }}>{w.skill}</span>
                </div>
              </div>
              <div style={{ fontSize: "14px", color: "#4a5568", lineHeight: "2" }}>
                <p style={{ margin: 0 }}>📍 {w.location}</p>
                <p style={{ margin: 0 }}>⏳ {w.experience}</p>
                <p style={{ margin: 0 }}>💰 ₹{w.salary}/month</p>
              </div>
              <a href={`https://wa.me/${w.phone?.replace("+", "").replace("whatsapp:", "")}`} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                <button style={{ marginTop: "16px", width: "100%", background: "#25D366", color: "white", border: "none", padding: "10px", borderRadius: "8px", fontSize: "14px", fontWeight: "bold", cursor: "pointer" }}>
                  📱 WhatsApp pe Contact karo
                </button>
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
