import { useState } from 'react';

import React from "react";

import RightContainer from './components/RightContainer/containers/RightContainer';

function App() {
//   const [count, setCount] = useState(0);

  return (
    <div id='main-container'>
      <div>
        <h1>GraphPulse</h1>
        <div className="card">
          <p>
            Edit <code>client/App.tsx</code> and save to test HMR
          </p>
        </div>
      </div>
      <RightContainer />
    </div>
  )
}

export default App;
