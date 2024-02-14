import React, { useState, useEffect } from "react";

function QLogsContainer({ latency, depth, uri}) {
  const sectionNames = ['Timestamp', 'Endpoint', 'Latency (ms)', 'Depth'];

  const [queryLogs, setQueryLogs] = useState([]);
  useEffect(() => {
    if (latency > 0 && depth > 0)  {
      const today = new Date();
      const timestamp = today.toDateString();
      setQueryLogs((queryLogs) => [...queryLogs, [timestamp, uri, latency, depth]]);
    }
  }, [latency, depth]);
  return (
    <div id="qlog-container">
      <div id="qlog-info-container">
        <table className="qlog-table">
          <thead>
            <tr>
              {sectionNames.map((name, i) => (
                <th key={i} className="qlog-table-header">
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {queryLogs.length > 0 ? (
              // Render rows only when there are data rows
              queryLogs.map((el, i) => (
                <tr key={i} className="qlog-table-row">
                  {el.map((item, j) => (
                    <td key={`${i}-${j}`} className="qlog-table-data">
                      {item}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              // Render an empty row when there are no data rows
              <tr>
                <td colSpan={sectionNames.length} className="qlog-table-data">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default QLogsContainer;