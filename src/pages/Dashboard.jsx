import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import FilterTags from "../components/FilterTags";
import RoadList from "../components/RoadList";
import MapView from "../components/MapView";
import AddIssue from "../components/Addissue";

import "./Dashboard.css";

export default function Dashboard() {

  const navigate = useNavigate();

  const [activeTag, setActiveTag] = useState("overview");
  const [roads, setRoads] = useState([]);
  const [selectedRoad, setSelectedRoad] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  const [query, setQuery] = useState("BENGALURU");
  const [loading, setLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState([12.9716, 77.5946]);


  const cityCoords = {
    bengaluru: [12.9716, 77.5946],
    mysuru: [12.2958, 76.6394],
    hyderabad: [17.3850, 78.4867],
    chennai: [13.0827, 80.2707]
  };


  const loadIssues = (city = "BENGALURU") => {

    setLoading(true);

    fetch(`http://localhost:5000/issues/city/${city}`)
      .then(res => res.json())
      .then(data => {

        const formatted = data.map((item, index) => ({
          id: item.id || index,
          title: item.road || "Unknown Road",
          desc: item.tags || "Issue reported",
          tag: (item.tags || "").toLowerCase(),
          score: parseFloat(item.vehicles) || 0,
          latitude: Number(item.latitude),
          longitude: Number(item.longitude),
          location: `${item.city}, ${item.state}`
        }));

        setRoads(formatted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadIssues("BENGALURU");
  }, []);


  const handleSearch = () => {

    if (!query) return;

    loadIssues(query);

    const city = query.toLowerCase();
    if (cityCoords[city]) {
      setMapCenter(cityCoords[city]);
    }

    setSelectedRoad(null);
  };


  const filteredRoads = useMemo(() => {
    return roads
      .filter(r => {

        if (activeTag === "overview") return true;

        if (activeTag === "accidents")
          return r.tag.includes("accident") ||
                 r.tag.includes("crash");

        if (activeTag === "potholes")
          return r.tag.includes("pothole");

        if (activeTag === "public transport")
          return r.tag.includes("bus") ||
                 r.tag.includes("metro") ||
                 r.tag.includes("transport") ||
                 r.tag.includes("rail");

        if (activeTag === "user_added")
          return r.tag.includes("user");

        return true;
      })
      .sort((a, b) => b.score - a.score);
  }, [roads, activeTag]);


  const heatPoints = useMemo(() => {

    return filteredRoads
      .filter(r => r.latitude && r.longitude)
      .slice(0, 8000)   
      .map(r => {

        let intensity = 0.4;

        if (r.score > 8) intensity = 1;
        else if (r.score > 5) intensity = 0.7;
        else if (r.score > 2) intensity = 0.5;

        return [
          r.latitude,
          r.longitude,
          intensity
        ];
      });

  }, [filteredRoads]);


  return (
    <>
      <div className="dashboard-panel">

        <input
          className="search-bar"
          placeholder="Search city..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSearch()}
        />

        <button 
          className="location-btn"
          onClick={() => navigate("/location-risk")}
        >
          📍 Danger Near Me
        </button>

        <FilterTags 
          active={activeTag} 
          setActive={setActiveTag} 
        />

        {loading && <div className="loader">Loading data...</div>}

        {!loading && filteredRoads.length === 0 && (
          <p className="no-data">No issues found for this city</p>
        )}

        {!loading && filteredRoads.length > 0 && (
          <RoadList 
            roads={filteredRoads}
            onSelect={setSelectedRoad}
          />
        )}

        <MapView
          lat={selectedRoad ? selectedRoad.latitude : mapCenter[0]}
          lon={selectedRoad ? selectedRoad.longitude : mapCenter[1]}
          road={selectedRoad?.title || query}
          heatPoints={heatPoints}
        />
      </div>

      <div 
        className="add-btn"
        onClick={() => setShowAdd(true)}
      >
        +
      </div>

      {showAdd && (
        <AddIssue 
          onClose={() => setShowAdd(false)}
          onAdded={() => loadIssues(query)}
        />
      )}
    </>
  );
}