import React from "react";


import GraphContainer from "./GraphContainer";
import QLogsContainer from "./QLogsContainer";


function RightContainer({ results, latency }) {
  return (
    <div id="right-container">
      <GraphContainer results={results}/>
      <QLogsContainer results={results} latency={latency}/>
    </div>
  )

}

export default RightContainer;