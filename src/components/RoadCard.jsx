import "./RoadCard.css";

export default function RoadCard({ title, desc, score }) {

  const risk = parseFloat(score) || 0;

  let color = "#2ecc71"; // green

  if (risk > 7) color = "#e74c3c";     // red
  else if (risk > 4) color = "#f39c12"; // orange

  return (
    <div 
      className="road-card"
      style={{ borderLeft: `6px solid ${color}` }}
    >
      <h3>{title}</h3>
      <p>{desc}</p>
      <p>Hodora Score: {score}</p>
    </div>
  );
}
