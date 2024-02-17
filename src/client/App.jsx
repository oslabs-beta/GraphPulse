import React from 'react';
import { useState } from 'react';

import AppLayout from './components/AppLayout';

function App({uri, setUri}) {
  return (
    <>
      <AppLayout uri={uri} setUri={setUri} />
    </>
  );
}

export default App;
