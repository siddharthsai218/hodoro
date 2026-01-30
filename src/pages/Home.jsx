import SearchBox from "../components/SearchBox";
import StateCard from "../components/StateCard";
import ProfileIcon from "../components/ProfileIcon";
import BackgroundMap from "../components/BackgroundMap";

export default function Home() {
  return (
    <div className="home-container">
      <BackgroundMap />

      <ProfileIcon />

      <SearchBox />

      <h1 className="title">Select Your State</h1>

      <div className="state-wrapper">
        <StateCard title="Karnataka" />
        <StateCard title="Many more states coming soon" />
      </div>
    </div>
  );
}
