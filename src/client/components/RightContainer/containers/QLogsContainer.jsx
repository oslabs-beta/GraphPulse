import React, { useState, useEffect } from "react";

function QLogsContainer({ isGuest, queryLogs, setQueryLogs}) {
  const sectionNames = ['Timestamp', 'Endpoint', 'Latency (ms)', 'Depth'];

  useEffect(() => {
    if (!isGuest) {
      // Fetch user's query logs from the server
      fetch(`/api/querylogs`)
        .then(response => response.json())
        .then(data => {
          setQueryLogs(data)
          
        })
        .catch(error => console.error(error));
    }
  }, [queryLogs]);

  // useEffect(() => {
  //   if (latency > 0 && depth > 0)  {
  //     const today = new Date();
  //     const timestamp = today.toDateString();
  //     const newLog = [timestamp, uri, latency, depth];
  //     setQueryLogs((queryLogs) => [...queryLogs, newLog]);

  //     if (!isGuest) {
  //       // Post new query log to the server
  //       fetch('/api/addquerylog', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           timestamp: timestamp,
  //           endpoint: uri,
  //           latency: latency,
  //           depth: depth,
  //         }),
  //       })
  //       .catch(error => console.error(error));
  //     }
  //   }
  // }, [latency, depth]);
  

  const deleteLog = (id) => {
    const newQueryLogs = queryLogs.filter(log => log._id !== id);
    setQueryLogs(newQueryLogs);

    if (!isGuest) {
      // Delete the query log from the server
      fetch(`/api/deletequerylog/${id}`, {
        method: 'DELETE',
      })
      .catch(error => console.error(error));
    }
  };
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
              queryLogs.slice().reverse().map((el, i) => (
                <tr key={i} className="qlog-table-row">
                  {Array.isArray(el) ? (
                    el.map((item, j) => (
                      <td key={`${i}-${j}`} className="qlog-table-data">
                        {item}
                      </td>
                    ))
                  ) : (
                    <>
                      <td className="qlog-table-data">{el.timestamp}</td>
                      <td className="qlog-table-data">{el.endpoint}</td>
                      <td className="qlog-table-data">{el.latency}</td>
                      <td className="qlog-table-data">{el.depth}</td>
                    </>
                  )}
                  <td className="qlog-table-data">
                    <button className="delete-button" onClick={() => deleteLog(el._id)}>Delete</button>
                  </td>
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