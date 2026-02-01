import { useState } from "react";
import "./LocationRisk.css";

export default function LocationRisk() {

  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [radius, setRadius] = useState(1);

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkRisk = async () => {

    if (!lat || !lon) {
      alert("Enter latitude and longitude");
      return;
    }

    setLoading(true);

    const res = await fetch(
      `http://localhost:5000/analytics/location-risk?lat=${lat}&lon=${lon}&radius=${radius}`
    );

    const data = await res.json();

    setResult(data);
    setLoading(false);
  };

  return (
    <div className="risk-page">

      <h2>📍 Danger Near You</h2>

      <div className="risk-box">

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

        {loading && <p className="loading">Analyzing...</p>}

        {result && (
          <div className="result-card">

            <h3>Risk Level</h3>

            <span className={`risk ${result.risk_level.toLowerCase()}`}>
              {result.risk_level}
            </span>

            <p>Risk Score: {result.risk_score}</p>

          </div>
        )}

      </div>

    </div>
  );
}
