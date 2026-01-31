import SearchBox from "../components/SearchBox";
import StateCard from "../components/StateCard";
import ProfileIcon from "../components/ProfileIcon";
import BackgroundMap from "../components/BackgroundMap";
import "./Home.css";
import { Link } from "react-router-dom";


export default function Home() {
  return (
    <div className="home-container">
      <BackgroundMap />

      <ProfileIcon />

      <SearchBox />

      <h1 className="title">Select Your State</h1>

      <div className="state-wrapper">
        <Link to="/dashboard" style={{ textDecoration: "none", color: "inherit" }}>
        <StateCard title="Karnataka" className="karnataka" path="/dashboard" />
        </Link>
        <StateCard title="Many more states coming soon" path="#" />

      </div>

    </div>
  );
}
