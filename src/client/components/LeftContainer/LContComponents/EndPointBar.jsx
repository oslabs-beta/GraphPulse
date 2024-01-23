import React, { useState } from 'react';
import { request } from 'graphql-request';

const DEFAULT_ENDPOINT = 'https://api.mocki.io/v2/c4d7a195/graphql';

function EndPointBar({ setEndpoint }) {
  const [endPointValue, setEndPointValue] = useState(DEFAULT_ENDPOINT);

  // handler for the "send" button
  const handleEndpointSubmit = () => {
    setEndpoint(endPointValue);
    // console.log(endPointValue);
    // console.log(typeof endPointValue);
  };

  return (
    <div id="endpoint-container">
      <input
        id="endpoint-input"
        type="text"
        placeholder="Enter URL or endpoint 🗝"
        value={endPointValue}
        onChange={(e) => setEndpoint(e.target.value.trim())}
      />

      <button id="endpoint-send-btn" onClick={handleEndpointSubmit}>
        Send
      </button>
    </div>
  );
}

export default EndPointBar;
