import React from "react";

import EndPointBar from "../components/EndPointBar";
import GraphContainer from "./GraphContainer";
import QLogsContainer from "./QLogsContainer";


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