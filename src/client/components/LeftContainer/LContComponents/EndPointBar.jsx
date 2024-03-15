import React, { useEffect, useState } from 'react';
import { request } from 'graphql-request';

function EndPointBar({endpoint, setEndpoint, setUri}) {

  const [isSent, setIsSent] = useState(false);


  const handleEndpointSubmit = () => {
    if(endpoint === '') return;
    setUri(endpoint);
    window.alert(`Endpoint set to: ${endpoint}!`);
    setIsSent(true); 
    console.log(endpoint);
  };

  useEffect(() => {
    if(endpoint === '') setIsSent(false);
},[endpoint]);

  return (
  <div id="endpoint-container">
    <button id="endpoint-send-btn" onClick={handleEndpointSubmit}>Send</button>
    <input 
      id="endpoint-input"
      type="text"
      placeholder="Enter URL or endpoint" 
      value={endpoint}
      onChange={(e) => setEndpoint(e.target.value)}
      style={{
        backgroundColor: isSent && endpoint !== '' ? '#4a6741' : '#201d34',
        borderColor: isSent && endpoint !== '' ? 'lightgreen' : '#b0a2b9',
        color: isSent  && endpoint !== '' ? 'white' : '#b0a2b9',
        transition: 'all 0.2s ease-in-out'
      }}
      />

 </div>
  )

}

export default EndPointBar;
