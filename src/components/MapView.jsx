import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import { useEffect, useRef } from "react";

function HeatLayer({ points }) {
  const map = useMap();
  const heatRef = useRef(null);

  useEffect(() => {
    if (!points || points.length === 0) return;

    if (heatRef.current) {
      map.removeLayer(heatRef.current);
    }

    heatRef.current = L.heatLayer(points, {
      radius: 45,
      blur: 30,
      maxZoom: 17,
      max: 1
    }).addTo(map);

  }, [points, map]);

  return null;
}

export default function MapView({ lat, lon, road, heatPoints }) {

  if (!lat || !lon) return null;

  return (
    <MapContainer
      center={[lat, lon]}
      zoom={11}
      style={{ height: "350px", width: "100%", borderRadius: "12px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[lat, lon]}>
        <Popup>{road}</Popup>
      </Marker>

      <HeatLayer points={heatPoints} />
    </MapContainer>
  );
}