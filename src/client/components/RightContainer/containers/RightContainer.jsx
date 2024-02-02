import React from "react";


import GraphContainer from "./GraphContainer";
import QLogsContainer from "./QLogsContainer";


function RightContainer({ results }) {
  return (
    <div id="right-container">
      <GraphContainer results={results}/>
      <QLogsContainer results={results} />
    </div>
  )

}

export default RightContainer;