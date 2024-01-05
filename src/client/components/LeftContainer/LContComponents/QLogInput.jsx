import React, { useState, useEffect } from 'react';
// import { GraphiQL } from 'graphiql';
// import { createGraphiQLFetcher } from '@graphiql/toolkit';

const QLogInput = ({}) => {
  const [qInput, setQInput] = useState('');

  return (
    <div className="inputArea">
      <h1>QLOG INPUT</h1>
      <form>
        <textarea value={qInput}></textarea>
      </form>
    </div>
  );
};

export default QLogInput;
