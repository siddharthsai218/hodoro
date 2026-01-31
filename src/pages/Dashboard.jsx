

// import { useState, useEffect } from "react";

// import FilterTags from "../components/FilterTags";
// import RoadList from "../components/RoadList";
// import MapView from "../components/MapView";
// import AddIssue from "../components/AddIssue";
// import "../components/FilterTags.css";



// import bg from "../assets/back.png";
// import "./Dashboard.css";

// export default function Dashboard() {

//   // ======================
//   // States
//   // ======================

//   const [activeTag, setActiveTag] = useState("overview");
//   const [roads, setRoads] = useState([]);
//   const [selectedRoad, setSelectedRoad] = useState(null);
//   const [showAdd, setShowAdd] = useState(false);

//   // ======================
//   // Fetch issues
//   // ======================

//   const loadIssues = () => {
//     fetch("http://localhost:5000/issues/city/BENGALURU")
//       .then(res => res.json())
//       .then(data => {

//         const formatted = data.map((item, index) => ({
//           id: item.id || index,
//           title: item.road || "Unknown Road",
//           desc: item.tags || "Issue reported",
//           date: "N/A",
//           location: `${item.city}, ${item.state}`,
//           score: item.vehicles ? `${item.vehicles}/10` : "N/A",

//           latitude: Number(item.latitude),
//           longitude: Number(item.longitude),

//           // 🔥 Tag for filtering
//           tag: item.tags ? item.tags.toLowerCase() : "accidents"
//         }));

//         setRoads(formatted);
//       })
//       .catch(err => console.log("Backend error:", err));
//   };

//   useEffect(() => {
//     loadIssues();
//   }, []);

//   // ======================
//   // Filter logic
//   // ======================

//   const filteredRoads =
//     activeTag === "overview"
//       ? roads
//       : roads.filter(road =>
//           road.tag.includes(activeTag)
//         );

//   // Close map when tag changes (better UX)
//   useEffect(() => {
//     setSelectedRoad(null);
//   }, [activeTag]);

//   // ======================
//   // UI
//   // ======================

//   return (
//     <div
//       className="dashboard-bg"
//       style={{ backgroundImage: `url(${bg})` }}
//     >

//       <div className="dashboard-panel">

//         {/* Search bar (future feature) */}
//         <input 
//           className="search-bar" 
//           placeholder="Search location..." 
//         />

//         {/* Filter tags */}
//         <FilterTags 
//           active={activeTag} 
//           setActive={setActiveTag} 
//         />

//         {/* Road list */}
//         <RoadList 
//           roads={filteredRoads}
//           onSelect={setSelectedRoad}
//         />

//         {/* Map section */}
//         {selectedRoad && (
//           <MapView
//             lat={selectedRoad.latitude}
//             lon={selectedRoad.longitude}
//             road={selectedRoad.title}
//           />
//         )}

//       </div>

//       {/* Floating + button */}
//       <div 
//         className="add-btn"
//         onClick={() => setShowAdd(true)}
//       >
//         +
//       </div>

//       {/* Add issue modal */}
//       {showAdd && (
//         <AddIssue 
//           onClose={() => setShowAdd(false)}
//           onAdded={loadIssues}
//         />
//       )}

//     </div>
//   );
// }
import { useState, useEffect } from "react";

import FilterTags from "../components/FilterTags";
import RoadList from "../components/RoadList";
import MapView from "../components/MapView";
import AddIssue from "../components/Addissue";

import "./Dashboard.css";

export default function Dashboard() {

  const [activeTag, setActiveTag] = useState("overview");
  const [roads, setRoads] = useState([]);
  const [selectedRoad, setSelectedRoad] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  const [query, setQuery] = useState("BENGALURU");
  const [cityStats, setCityStats] = useState(null);

  const [mapCenter, setMapCenter] = useState([12.9716, 77.5946]);

  const [loading, setLoading] = useState(false);  
  const cityCoords = {
    bengaluru: [12.9716, 77.5946],
    mysuru: [12.2958, 76.6394],
    hyderabad: [17.3850, 78.4867],
    chennai: [13.0827, 80.2707]
  };

  // ================= FETCH ISSUES =================

  const loadIssues = (city = "BENGALURU") => {

    setLoading(true);

    fetch(`http://localhost:5000/issues/city/${city}`)
      .then(res => res.json())
      .then(data => {

        const formatted = data.map((item, index) => ({
          id: item.id || index,
          title: item.road || "Unknown Road",
          desc: item.tags || "Issue reported",
          tag: item.tags || "overview",
          date: "N/A",
          location: `${item.city}, ${item.state}`,
          score: item.vehicles ? `${item.vehicles}` : "0",
          latitude: Number(item.latitude),
          longitude: Number(item.longitude)
        }));

        setRoads(formatted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  // ================= FETCH CITY STATS =================

  const loadCityStats = () => {
    fetch("http://localhost:5000/analytics/risk")
      .then(res => res.json())
      .then(data => {

        const city = data.find(
          d => d.district?.toLowerCase().includes(query.toLowerCase())
        );

        setCityStats(city || null);
      });
  };

  useEffect(() => {
    loadIssues("BENGALURU");
    loadCityStats();
  }, []);
  useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, [activeTag]);


  // ================= SEARCH =================

  const handleSearch = () => {

    loadIssues(query);
    loadCityStats();

    const city = query.toLowerCase();

    if (cityCoords[city]) {
      setMapCenter(cityCoords[city]);
    }

    setSelectedRoad(null);
  };

  // ================= FILTER + SORT =================

  const filteredRoads = roads
    .filter(r => {

      if (activeTag === "overview") return true;

      const tag = r.tag.toLowerCase();

      if (activeTag === "accidents") return tag.includes("accident");
      if (activeTag === "potholes") return tag.includes("pothole");
      if (activeTag === "public transport") return tag.includes("public");
      if (activeTag === "user_added") return tag.includes("user");

      return true;
    })
    .sort((a, b) => {

      if (activeTag === "overview") {
        return (parseFloat(b.score) || 0) - (parseFloat(a.score) || 0);
      }

      return 0;
    });

  // ================= UI =================

  return (
    <>

      <div className="dashboard-panel">

        {/* SEARCH */}
        <input
          className="search-bar"
          placeholder="Search city..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSearch()}
        />

        {/* CITY STATS */}
        {cityStats && (
          <div className="stats-card">
            <h3>{cityStats.district}</h3>
            <p>Total Accidents: {cityStats.total_accidents}</p>
            
          </div>
        )}

        {/* TAGS */}
        <FilterTags 
          active={activeTag} 
          setActive={setActiveTag} 
        />

        {/* LOADING */}
        {loading && (
          <div className="loader">Loading data...</div>
        )}

        {/* NO DATA */}
        {!loading && filteredRoads.length === 0 && (
          <p className="no-data">No issues found for this city</p>
        )}

        {/* ROAD LIST */}
        {!loading && filteredRoads.length > 0 && (
          <RoadList 
            roads={filteredRoads}
            onSelect={setSelectedRoad}
          />
        )}

        {/* MAP */}
        <MapView
          lat={selectedRoad ? selectedRoad.latitude : mapCenter[0]}
          lon={selectedRoad ? selectedRoad.longitude : mapCenter[1]}
          road={selectedRoad?.title || query}
        />

      </div>

      {/* + BUTTON */}
      <div 
        className="add-btn"
        onClick={() => setShowAdd(true)}
      >
        +
      </div>

      {/* ADD ISSUE MODAL */}
      {showAdd && (
        <AddIssue 
          onClose={() => setShowAdd(false)}
          onAdded={() => loadIssues(query)}
        />
      )}

    </>
  );
}
