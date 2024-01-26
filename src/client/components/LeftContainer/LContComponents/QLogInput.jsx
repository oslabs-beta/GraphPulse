import React, { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import Split from 'react-split';
import { gql, useLazyQuery } from '@apollo/client';

// Once you make a query in the apollo sandbox, you can bring it over to the FE
// const GET_ALL_USERS = gql`
//   query GetAllUsers {
//     users {
//       id
//       username
//       email
//       password
//       queryLogs {
//         query_name
//         timestamp
//         depth
//       }
//     }
//   }
// `;

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

function QLogInput({ qInput, setQInput }) {

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

  const [results, setResults] = useState('');

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
              getLazyResults();
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
            readOnly
          />
        </section>
      </Split>
    </div>
  );
}

export default QLogInput;
