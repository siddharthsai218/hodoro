import { useState } from "react";
import FilterTags from "../components/FilterTags";
import RoadList from "../components/RoadList";
import bg from "../assets/back.png";
import "./Dashboard.css";

export default function Dashboard() {

  const [activeTag, setActiveTag] = useState("overview");

  const roads = [
    {
      id: 1,
      title: "Road 1",
      desc: "High accident zone",
      date: "January 29, 2026 at 04:45 PM",
      location: "789 Brigade Road, Bangalore, Karnataka",
      score: "9.1/10"
    },
    {
      id: 2,
      title: "Road 2",
      desc: "Potholes reported",
      date: "January 20, 2026 at 10:20 AM",
      location: "Whitefield, Bangalore",
      score: "7.8/10"
    },
    {
      id: 3,
      title: "Road 3",
      desc: "Traffic congestion",
      date: "January 15, 2026 at 06:30 PM",
      location: "MG Road, Bangalore",
      score: "8.5/10"
    }
  ];

  return (
    <div 
      className="dashboard-bg" 
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="dashboard-panel">

        <input 
          className="search-bar" 
          placeholder="Search location..." 
        />

        <FilterTags 
          active={activeTag} 
          setActive={setActiveTag} 
        />

        <RoadList roads={roads} />

      </div>
    </div>
  );
}
