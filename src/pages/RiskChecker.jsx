import { useState } from "react";
import "./RiskChecker.css";

export default function RiskChecker() {

  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkRisk = async () => {
    if (!lat || !lon) return alert("Enter latitude and longitude");

    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:5000/analytics/location-risk?lat=${lat}&lon=${lon}&radius=1`
      );

      const data = await res.json();
      setResult(data);

    } catch (err) {
      alert("Error fetching risk");
    }

    setLoading(false);
  };

  return (
    <div className="risk-page">

      <h2>Check Danger Near You</h2>

      <div className="risk-form">

        <input
          placeholder="Latitude"
          value={lat}
          onChange={e => setLat(e.target.value)}
        />

        <input
          placeholder="Longitude"
          value={lon}
          onChange={e => setLon(e.target.value)}
        />

        <button onClick={checkRisk}>
          Check Risk
        </button>

      </div>

      {loading && <p>Checking...</p>}

      {result && (
        <div className={`risk-result ${result.risk_level.toLowerCase()}`}>

          <h3>Risk Level: {result.risk_level}</h3>
          <p>Risk Score: {result.risk_score}</p>

        </div>
      )}

    </div>
  );
}
