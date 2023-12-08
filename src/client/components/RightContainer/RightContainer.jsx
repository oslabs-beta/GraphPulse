import React from "react";

import EndPointBar from "./RContComponents/EndPointBar";
import GraphContainer from "./RContComponents/GraphContainer";
import QLogsContainer from "./RContComponents/QLogsContainer";


function RightContainer() {
  return (
    <div id="right-container">
      <EndPointBar />
      <GraphContainer />
      <QLogsContainer />
    </div>
  )

}

export default RightContainer;