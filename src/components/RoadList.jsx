import RoadCard from "./RoadCard";
import RoadDetail from "./RoadDetail";
import React from "react";


export default function RoadList({ roads }) {

  const [openId, setOpenId] = React.useState(null);

  return (
    <div className="roads">

      {roads.map(road => (
        <div key={road.id}>

          {/* Road card */}
          <div onClick={() => 
            setOpenId(openId === road.id ? null : road.id)
          }>
            <RoadCard 
              title={road.title} 
              desc={road.desc} 
            />
          </div>

          {/* Detail directly under clicked road */}
          {openId === road.id && (
            <RoadDetail road={road} />
          )}

        </div>
      ))}

    </div>
  );
}
