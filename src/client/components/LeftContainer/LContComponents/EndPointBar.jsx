import React, { useState } from 'react';
import { request } from 'graphql-request';

function EndPointBar({ setEndpoint }) {
  const [endPointValue, setEndpointValue] = useState();

  // handler for "send" button
  const handleEndpointSubmit = () => {
    setEndpointValue(e.target.value.trim());
  };

  return (
    <div id="endpoint-container">
      <input
        id="endpoint-input"
        type="text"
        placeholder="Enter URL or endpoint 🗝"
        value={endPointValue}
        onChange={(e) => setEndpointValue(e.target.value.trim())}
      />

      <button id="endpoint-send-btn" onClick={handleEndpointSubmit}>
        Send
      </button>
    </div>
  );
}

export default EndPointBar;
