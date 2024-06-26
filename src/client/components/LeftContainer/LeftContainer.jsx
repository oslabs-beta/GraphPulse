import React, { useState } from 'react';
import Navbar from './LContComponents/Navbar';
import EndPointBar from './LContComponents/EndPointBar';
import QLogInput from './LContComponents/QLogInput';
import QLogOutput from "./LContComponents/QLogOutput";

function LeftContainer({qInput, setQInput, uri, setUri, depth, results, setResults, setLatency, setDepth, isGuest, client, setQueryLogs, setFetchedData }) {
  const [endpoint, setEndpoint] = useState('');

  return (
    <div id="left-container">
      <div id="graph-pulse-header">
      <img id="graph-pulse-icon" src="../../assets/GraphPulseLogo1.png" alt="GraphPulse Logo"/>
        <p id="project-title">GraphPulse</p>
      </div>
      <Navbar isGuest={isGuest} setQInput={setQInput} setResults={setResults} setLatency={setLatency} setDepth={setDepth} setQueryLogs={setQueryLogs} setFetchedData={setFetchedData} setEndpoint={setEndpoint} />
      <EndPointBar endpoint={endpoint} setEndpoint={setEndpoint} setUri={setUri}/>
      <QLogInput 
        qInput={qInput} 
        setQInput={setQInput}
        results={results}
        uri={uri}
        setResults={setResults}
        setLatency={setLatency}
        setDepth={setDepth}
        isGuest={isGuest}
        client={client}
        setQueryLogs={setQueryLogs}
        depth={depth}
        />
      <QLogOutput />
    </div>
  );
}

export default LeftContainer;
