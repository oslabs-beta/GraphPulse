import React from "react";


import GraphContainer from "./GraphContainer";
import QLogsContainer from "./QLogsContainer";


function RightContainer() {
  return (
    <div id="right-container">
      <GraphContainer />
      <QLogsContainer />
    </div>
  )

}

export default RightContainer;