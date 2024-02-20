import React from "react";


import GraphContainer from "./GraphContainer";
import QLogsContainer from "./QLogsContainer";


function RightContainer({results, latency, depth, uri, isGuest}) {
  return (
    <div id="right-container">
      <GraphContainer results={results}/>
      <QLogsContainer 
        latency={latency} 
        depth={depth}
        uri={uri}
        isGuest={isGuest}
        />
    </div>
  )

}

export default RightContainer;