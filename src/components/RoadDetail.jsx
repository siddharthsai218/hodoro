export default function RoadDetail({ road }) {

  if (!road) return null;

  return (
    <div className="detail-card">

      <h2>{road.title}</h2>

      <p className="label">Date and Time</p>
      <p>{road.date}</p>

      <p className="label">Location</p>
      <p>{road.location}</p>

      <p className="label">HODORA Score</p>
      <p>{road.score}</p>

      <div className="map-preview">
        Map will be displayed here
      </div>

    </div>
  );
}
