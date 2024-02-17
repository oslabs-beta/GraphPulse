import React from "react";


import GraphContainer from "./GraphContainer";
import QLogsContainer from "./QLogsContainer";


function RightContainer({results, latency, depth, uri}) {
  return (
    <div id="right-container">
      <GraphContainer results={results}/>
      <QLogsContainer 
        latency={latency} 
        depth={depth}
        uri={uri}
        />
    </div>
  )

}

export default RightContainer;