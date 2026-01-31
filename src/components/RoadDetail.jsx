
import MapView from "./MapView";

export default function RoadDetail({ road }) {

  return (
    <div className="detail-card">

      <h2>{road.title}</h2>

      <p className="label">Date and Time</p>
      <p>{road.date}</p>

      <p className="label">Location</p>
      <p>{road.location}</p>

      <p className="label">HODORA Score</p>
      <p>{road.score}</p>

      {/* MAP HERE 👇 */}
      <MapView
        lat={road.latitude}
        lon={road.longitude}
        road={road.title}
      />

    </div>
  );
}

// import MapView from "./MapView";

// export default function RoadDetail({ road, allRoads }) {

//   return (
//     <div className="detail-card">

//       <h2>{road.title}</h2>

//       <p>{road.location}</p>
//       <p>{road.score}</p>

//       <MapView
//         lat={road.latitude}
//         lon={road.longitude}
//         road={road.title}
//         allRoads={allRoads}
//       />

//     </div>
//   );
// }
