import { useState } from "react";
import RoadCard from "./RoadCard";
import RoadDetail from "./RoadDetail";



export default function RoadList({ roads, onSelect }) {


  const [openId, setOpenId] = useState(null);


  return (
    <div className="roads">

      {roads.map(road => (
        <div key={road.id}>

          
          <div 
          onClick={() => {
            setOpenId(openId === road.id ? null : road.id);
            onSelect(road);
            }}>

            <RoadCard 
              title={road.title} 
              desc={road.desc} 
              score={road.score}
            />
          </div>

          
          {openId === road.id && (
            <RoadDetail road={road}/>

          )}

        </div>
      ))}

    </div>
  );
}
