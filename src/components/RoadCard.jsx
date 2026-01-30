import "./RoadCard.css";

export default function RoadCard({ title, desc }) {
  return (
    <div className="road-card">
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}
