import React from "react";


import GraphContainer from "./GraphContainer";
import QLogsContainer from "./QLogsContainer";


function RightContainer({results, latency, depth, uri, isGuest, queryLogs, setQueryLogs, fetchedData, setFetchedData}) {
  return (
    <div id="right-container">
      <GraphContainer results={results}/>
      <QLogsContainer 
        latency={latency} 
        depth={depth}
        uri={uri}
        isGuest={isGuest}
        queryLogs={queryLogs}
        setQueryLogs={setQueryLogs}
        fetchedData={fetchedData}
        setFetchedData={setFetchedData}
        />
    </div>
  )

}

export default RightContainer;