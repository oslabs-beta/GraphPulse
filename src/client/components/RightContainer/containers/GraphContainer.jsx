import React from "react";
import QFlow from "../components/QFlow";

function GraphContainer({ results }) {

  return (
    <div id="graph-container">
      <QFlow results={results}/>
    </div>
  )

}

export default GraphContainer;