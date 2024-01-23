import React, { useState } from 'react';
import { request } from 'graphql-request';
import MonacoEditor from 'react-monaco-editor';
import Split from 'react-split';

// Default operations for the Monaco editor
const defaultOperation = `
# Enter a query #

query {

}
`;

function QLogInput() {
  // States for query and results
  const [query, setQuery] = useState(defaultOperation);
  const [results, setResults] = useState('');

  // Event handler for query input changes
  const handleQueryChange = (newQuery) => {
    setQuery(newQuery);
  };

  // Event handler for running the query
  const handleRunQuery = () => {
    // Test for mock data

    const resultString = [
      'user1user1@example.com1',
      'user2user2@example.com1',
      'user3user3@example.com1',
      'user4user4@example.com1',
      'user5user5@example.com1',
    ].join('\n');

    setResults(resultString);
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
            value={query}
            onChange={handleQueryChange}
            height="300"
            width="200%"
          />
          <button
            id="input-run-btn"
            onClick={handleRunQuery}
            className="run-query-button"
          >
            Run Query
          </button>
        </section>
        <section className="editor-container results-editor">
          <MonacoEditor
            language="plaintext"
            theme="vs-dark"
            value={results}
            height="300"
            width="200%"
            readOnly
          />
        </section>
      </Split>
    </div>
  );
}

export default QLogInput;
