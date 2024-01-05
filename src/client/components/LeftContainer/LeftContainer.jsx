import React from 'react';

import Navbar from './LContComponents/Navbar';
import QLogInput from './LContComponents/QLogInput';
import QLogOutput from './LContComponents/QLogOutput';

function LeftContainer() {
  return (
    <div id="left-container">
      <div id="graph-pulse-header">
        <img src="../assets/graphqlJPEG.jpg" alt="GraphPulse Logo" />
        <h1 id="projectTitle">GraphPulse</h1>
      </div>
      <Navbar />
      <QLogInput />
      <QLogOutput />
    </div>
  );
}

export default LeftContainer;
