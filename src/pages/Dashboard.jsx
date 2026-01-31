

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
import AddIssue from "../components/AddIssue";

import bg from "../assets/back.png";
import "./Dashboard.css";

export default function Dashboard() {

  const [activeTag, setActiveTag] = useState("overview");
  const [roads, setRoads] = useState([]);
  const [selectedRoad, setSelectedRoad] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  // ==========================
  // Fetch issues from backend
  // ==========================

  const loadIssues = () => {
    fetch("http://localhost:5000/issues/city/BENGALURU")
      .then(res => res.json())
      .then(data => {

        const formatted = data.map((item, index) => ({
          id: item.id || index,
          title: item.road || "Unknown Road",
          desc: item.tags || "Issue reported",

          // 👇 THIS POWERS FILTERING
          tag: item.tags || "overview",

          date: "N/A",
          location: `${item.city}, ${item.state}`,
          score: item.vehicles ? `${item.vehicles}/10` : "N/A",

          latitude: Number(item.latitude),
          longitude: Number(item.longitude)
        }));

        setRoads(formatted);
      })
      .catch(err => console.log("Error:", err));
  };

  useEffect(() => {
    loadIssues();
  }, []);

  // ==========================
  // Tag Filtering Logic
  // ==========================

  const filteredRoads =
    activeTag === "overview"
      ? roads
      : roads.filter(r =>
          r.tag.toLowerCase().includes(activeTag)
        );

  // ==========================
  // UI
  // ==========================

  return (
    <div
      className="dashboard-bg"
      style={{ backgroundImage: `url(${bg})` }}
    >

      <div className="dashboard-panel">

        {/* Search bar (future use) */}
        <input 
          className="search-bar" 
          placeholder="Search location..." 
        />

        {/* Filter Tags */}
        <FilterTags 
          active={activeTag} 
          setActive={setActiveTag} 
        />

        {/* Road List */}
        <RoadList 
          roads={filteredRoads}
          onSelect={setSelectedRoad}
        />

        {/* Map section */}
        {selectedRoad && (
          <MapView
            lat={selectedRoad.latitude}
            lon={selectedRoad.longitude}
            road={selectedRoad.title}
          />
        )}

      </div>

      {/* Floating + button */}
      <div 
        className="add-btn"
        onClick={() => setShowAdd(true)}
      >
        +
      </div>

      {/* Add issue modal */}
      {showAdd && (
        <AddIssue 
          onClose={() => setShowAdd(false)}
          onAdded={loadIssues}
        />
      )}

    </div>
  );
}
