import { useState } from "react";
import RoadCard from "./RoadCard";
import RoadDetail from "./RoadDetail";



export default function RoadList({ roads, onSelect }) {


  const [openId, setOpenId] = useState(null);


  return (
    <div className="roads">

      {roads.map(road => (
        <div key={road.id}>

          {/* Road card */}
          <div 
          onClick={() => {
            setOpenId(openId === road.id ? null : road.id);
            onSelect(road);
            }}>

            <RoadCard 
              title={road.title} 
              desc={road.desc} 
            />
          </div>

          {/* Detail directly under clicked road */}
          {openId === road.id && (
            <RoadDetail road={road}/>

          )}

        </div>
      ))}

    </div>
  );
}
// import RoadCard from "./RoadCard";

// export default function RoadList({ roads, onSelect }) {

//   return (
//     <div className="road-list">

//       {roads.map(road => (
//         <div 
//           key={road.id}
//           onClick={() => onSelect(road)}
//         >
//           <RoadCard 
//             title={road.title}
//             desc={road.desc}
//           />
//         </div>
//       ))}

//     </div>
//   );
// }
