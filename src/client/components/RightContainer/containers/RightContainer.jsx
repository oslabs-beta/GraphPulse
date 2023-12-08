import React from "react";

import EndPointBar from "../components/EndPointBar";
import GraphContainer from "./components/GraphContainer";
import QLogsContainer from "./components/QLogsContainer";


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