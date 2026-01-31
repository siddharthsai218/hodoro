import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function MapView({ lat, lon, road }) {
  if (!lat || !lon) return null;

  return (
    <MapContainer
      center={[lat, lon]}
      zoom={15}
      style={{ height: "250px", width: "100%", borderRadius: "12px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[lat, lon]}>
        <Popup>{road}</Popup>
      </Marker>
    </MapContainer>
  );
}

// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

// export default function MapView({ lat, lon, road, allRoads }) {

//   return (
//     <div style={{ height: "300px", marginTop: "20px", borderRadius: "12px", overflow: "hidden" }}>
      
//       <MapContainer 
//         center={[lat, lon]} 
//         zoom={13} 
//         style={{ height: "100%", width: "100%" }}
//       >

//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />

//         {/* All accident markers */}
//         {allRoads.map(r => (
//           <Marker 
//             key={r.id} 
//             position={[r.latitude, r.longitude]}
//           >
//             <Popup>
//               <strong>{r.title}</strong><br/>
//               {r.desc}
//             </Popup>
//           </Marker>
//         ))}

//       </MapContainer>

//     </div>
//   );
// }
