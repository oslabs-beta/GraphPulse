import React, { useState } from 'react';
import Navbar from './LContComponents/Navbar';
import EndPointBar from './LContComponents/EndPointBar';
import QLogInput from './LContComponents/QLogInput';

function LeftContainer() {
  const [endpoint, setEndpoint] = useState('');
  const [qInput, setQInput] = useState('');

  return (
    <div id="left-container">
      <div id="graph-p-header">
        <img
          id="graph-pulse-icon"
          src="../../assets/grahpqllogo.png"
          alt="GraphPulse Logo"
        />
        <p id="project-title">GraphPulse</p>
      </div>
      <Navbar />
      <EndPointBar endpoint={endpoint} setEndpoint={setEndpoint} />
      <QLogInput qInput={qInput} setQInput={setQInput} />
    </div>
  );
}

export default LeftContainer;
