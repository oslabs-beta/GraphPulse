import React from 'react';

import Navbar from './LContComponents/Navbar';
import QLogInput from './LContComponents/QLogInput';
import QLogOutput from './LContComponents/QLogOutput';

function LeftContainer() {
  return (
    <>
      <Navbar />
      <QLogInput />
      <QLogOutput />
    </>
  );
}

export default LeftContainer;
