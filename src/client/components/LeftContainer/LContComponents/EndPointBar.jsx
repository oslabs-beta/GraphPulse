import React, { useState } from 'react';
import { request } from 'graphql-request';

function EndPointBar({endpoint, setEndpoint, uri, setUri}) {


  const handleEndpointSubmit = () => {
    setUri(endpoint);
    console.log(endpoint);
  };
  return (
  <div id="endpoint-container">
    <button id="endpoint-send-btn" onClick={handleEndpointSubmit}>Send</button>
    <input 
      id="endpoint-input"
      type="text"
      placeholder="Enter URL or endpoint" 
      value={endpoint}
      onChange={(e) => setEndpoint(e.target.value)}
      />

 </div>
  )

}

export default EndPointBar;
