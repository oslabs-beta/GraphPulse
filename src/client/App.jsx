import React from 'react';
import { useState } from 'react';

import AppLayout from './components/AppLayout';

function App({uri, setUri, client}) {
  return (
    <>
      <AppLayout uri={uri} setUri={setUri} client={client} />
    </>
  );
}

export default App;
