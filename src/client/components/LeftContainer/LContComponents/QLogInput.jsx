import React, { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import Split from 'react-split';
import { gql, useLazyQuery } from '@apollo/client';

// Default operations for the Monaco editor
const defaultOperation = `
# Enter a query #

query {

}
`;

// graphql defined query (syntax)
let adjustedOperation = `{
  users{
    id
    email
  }
}
`;

function QLogInput({ qInput, setQInput, results, setResults, setLatency}) {

  // States for query and results
  const [getLazyResults, { loading, data }] = useLazyQuery(
    gql`
      ${adjustedOperation}
    `,
    {
      onCompleted: (queryData) => {
        setResults(updateResults(queryData));
      },
    }
  );

  // map query results for rendering
  const updateResults = (queryData) => {
    const mappedData = Object.entries(queryData).map(([key, values]) => {
      if (Array.isArray(values)) {
        return values.map((value) => value); // Handle arrays
      } else {
        return values; // Handle objects directly
      }
    });
    return mappedData;
  };

  return (
    <div className="monaco-container">
      <Split
        sizes={[50, 50]}
        minSize={5}
        expandToMin={false}
        gutterSize={10}
        gutterAlign="center"
        dragInterval={1}
        direction="horizontal"
        cursor="col-resize"
        className="query-results-split"
      >
        <section className="editor-container query-editor">
          <MonacoEditor
            language="graphql"
            theme="vs-dark"
            value={defaultOperation}
            onChange={(value) => setQInput(value)}
            height="300"
            width="200%"
          />
          <button
            id="input-run-btn"
            onClick={() => {
              adjustedOperation = qInput;
              let startTime = performance.now();
              getLazyResults();
              let endTime = performance.now();
              let latency = endTime - startTime;  //latency calculated here
              console.log("Query latency:", latency, "ms");
              setLatency(latency);
            }}
            className="run-query-button"
          >
            Run Query
          </button>
        </section>
        <section className="editor-container results-editor">
          <MonacoEditor
            language="plaintext"
            theme="vs-dark"
            value={JSON.stringify(results, null, 2)}
            height="300"
            width="200%"
            options={{
              readOnly: true,
            }}
          />
        </section>
      </Split>
    </div>
  );
}

export default QLogInput;
