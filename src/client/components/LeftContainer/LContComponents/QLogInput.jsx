import React, { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import Split from 'react-split';
import { gql, useLazyQuery } from '@apollo/client';
const { parse } = require('graphql');

// Default operations for the Monaco editor
const defaultOperation = `
# Enter a query #

query {

}
`;

// graphql defined query (syntax)

function QLogInput({ qInput, uri, setQInput, results, depth, setResults, setLatency, setDepth, isGuest, client, setQueryLogs}) {
const [startTime, setStartTime] = useState(0);
const [adjustedOperation, setAdjustedOperation] = useState(``);

  // States for query and results
  const fetchResults = async () => {
    const newAdjustedOperation = qInput;
    setAdjustedOperation(newAdjustedOperation);
    console.log(newAdjustedOperation)
    try {
      setStartTime(performance.now())
      const response = await client.query({
        query: gql`${newAdjustedOperation}`
      });
      if (!response.data) {
        throw new Error('No data returned from query');
      }
      const queryData = response.data;
      setResults(updateResults(queryData));
      console.log(queryData);
      let endTime = performance.now();
      let latency = Math.round(endTime - startTime); //latency calculated here
      setLatency(Math.round(latency));
      let newDepth = calculateDepth(qInput);
      setDepth(newDepth - 1);
      const today = new Date();
      const timestamp = today.toDateString();
      const newLog = [timestamp, uri, latency, depth];
      setQueryLogs((queryLogs) => [...queryLogs, newLog]);
      if (!isGuest) {
        // Post new query log to the server
        fetch('/api/addquerylog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            timestamp: timestamp,
            endpoint: uri,
            latency: latency,
            depth: newDepth - 1,
          }),
        })
        .catch(error => console.error(error));
      }

    } catch (error) {
      console.error('Error executing query:', error);
      window.alert('Error executing query. Please check your query and try again.');
    }
  };
const calculateDepth = (queryString) =>  {
    const ast = parse(queryString);
  
    function calculateDepthRecursive(node, currentDepth) {
      
      let depth = currentDepth;
  
      if (node.selectionSet && node.selectionSet.selections.length > 0) {
        depth++;
        node.selectionSet.selections.forEach((selection) => {
          const selectionDepth = calculateDepthRecursive(selection, depth);

          depth = Math.max(depth, selectionDepth);
        });
      }
  
      return depth;
    }

    if (ast.definitions && ast.definitions.length > 0) {
      const firstDefinition = ast.definitions[0];
      if (firstDefinition.selectionSet) {
        return calculateDepthRecursive(firstDefinition, 0);
      }
    }
  
    return 0;
  }
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
        // sizes={[50, 50]}
        // minSize={5}
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
              fetchResults();
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
