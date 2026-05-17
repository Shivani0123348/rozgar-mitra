import { useState, useEffect } from "react";

function App() {
  const [workers, setWorkers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/workers")
      .then((res) => res.json())
      .then((data) => setWorkers(data))
      .catch(() => {});
  }, []);

  const filtered = workers.filter((w) =>
    w.skill?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f0f4f8", fontFamily: "'Segoe UI', sans-serif" }}>
      
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1a1a2e, #16213e)", padding: "24px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ color: "white", margin: 0, fontSize: "26px" }}>🤝 Rozgar Mitra</h1>
          <p style={{ color: "#a0aec0", margin: "4px 0 0", fontSize: "14px" }}>Employer Dashboard — UP Workers</p>
        </div>
        <div style={{ background: "#25D366", borderRadius: "20px", padding: "8px 20px", color: "white", fontSize: "14px", fontWeight: "bold" }}>
          {workers.length} Workers Available
        </div>
      </div>

      {/* Search Bar */}
      <div style={{ padding: "30px 40px 10px" }}>
        <input
          placeholder="🔍 Search by skill — painter, plumber, electrician..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            width: "100%", padding: "14px 20px", borderRadius: "12px",
            border: "2px solid #e2e8f0", fontSize: "16px",
            boxSizing: "border-box", outline: "none",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
          }}
        />
      </div>

      {/* Cards */}
      <div style={{ padding: "20px 40px", display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {filtered.length === 0 ? (
          <div style={{ width: "100%", textAlign: "center", padding: "60px", color: "#718096" }}>
            <p style={{ fontSize: "48px" }}>👷</p>
            <p style={{ fontSize: "18px" }}>Koi worker nahi mila — WhatsApp bot se workers add honge!</p>
          </div>
        ) : (
          filtered.map((w, i) => (
            <div key={i} style={{
              background: "white", borderRadius: "16px", padding: "20px",
              width: "260px", boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
              border: "1px solid #e2e8f0", transition: "transform 0.2s"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <div style={{
                  width: "48px", height: "48px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "white", fontWeight: "bold", fontSize: "20px"
                }}>
                  {w.name?.[0]?.toUpperCase() || "?"}
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: "16px" }}>{w.name || "Unknown"}</h3>
                  <span style={{
                    background: "#ebf8ff", color: "#2b6cb0",
                    padding: "2px 8px", borderRadius: "10px", fontSize: "12px"
                  }}>{w.skill}</span>
                </div>
              </div>
              <div style={{ fontSize: "14px", color: "#4a5568", lineHeight: "2" }}>
                <p style={{ margin: 0 }}>📍 {w.location}</p>
                <p style={{ margin: 0 }}>⏳ {w.experience} experience</p>
                <p style={{ margin: 0 }}>💰 ₹{w.salary}/month</p>
              </div>
              <a href={`https://wa.me/${w.phone?.replace("+", "")}`} target="_blank" rel="noreferrer"
                style={{ textDecoration: "none" }}>
                <button style={{
                  marginTop: "16px", width: "100%", background: "#25D366",
                  color: "white", border: "none", padding: "10px",
                  borderRadius: "8px", fontSize: "14px", fontWeight: "bold",
                  cursor: "pointer"
                }}>
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