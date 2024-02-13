import React, { useState, useEffect } from "react";

import QueryLog from "../components/QueryLog";

function QLogsContainer({ results, latency }) {
  const sectionNames = ['Timestamp', 'Name', 'Latency'];
  const sectionNamesDisplay = ['Timestamp', 'Name', 'Latency'];
  const hardCodeTest = [
    ['1985-09-25 17:45:30.005', 'Test Query', '145'],
    ['1985-09-25 17:45:30.005', 'Test Query', '145'],
    ['1985-09-25 17:45:30.005', 'Test Query', '145'],
    ['1985-09-25 17:45:30.005', 'Test Query', '145'],
    ['1985-09-25 17:45:30.005', 'Test Query', '145'],
    ['1985-09-25 17:45:30.005', 'Test Query', '145'],
    ['1985-09-25 17:45:30.005', 'Test Query', '145'],
    ['1985-09-25 17:45:30.005', 'Test Query', '145'],
    ['1985-09-25 17:45:30.005', 'Test Query', '145'],
    ['1985-09-25 17:45:30.005', 'Test Query', '145'],
    ['1985-09-25 17:45:30.005', 'Test Query', '145'],
    ['1985-09-25 17:45:30.005', 'Test Query', '145'],
    ['1985-09-25 17:45:30.005', 'Test Query', '145']
  ];

  // const sections = [];
  // for (let i = 0; i < sectionNames.length; i++) {
    //   sections.push(<QLogsSectionHeader 
    //     key={i}
    //     index={i} 
    //     // hardCodeTestLength={hardCodeTest.length} 
    //     sectionName={sectionNames[i]} 
    //     sectionNameDisplay={sectionNamesDisplay[i]} 
    //     hardCodeTest={hardCodeTest} 
    //     />)
    // }
    
    // const infoRow = [];
    
    // for (let i = 0; i < hardCodeTest.length; i++) {
      //   infoRow.push(<QLogsInfo key={i} hardCodeTest={hardCodeTest[i]} />);
      // }
      
  const [queryLogs, setQueryLogs] = useState([]);
  useEffect(() => {
    const today = new Date();
    const timestamp = today.toDateString();
    // const newLogs = [...queryLogs, [timestamp, 'Test Query', latency]];
    setQueryLogs((queryLogs) => [...queryLogs, [timestamp, 'Test Query', latency]]);
    // setQueryLogs([...queryLogs, [timestamp, 'Test Query', latency]]);
  }, [latency])

  return (
    <div id="qlog-container">
        <div id="qlog-section-header">
          <h3>Timestamp</h3>
        </div>
        <div id="qlog-section-header">
          <h3>Query Name</h3>
        </div>
        <div id="qlog-section-header">
          <h3>Latency</h3>
        </div>
        <div id="qlog-info-container">
          {queryLogs.length ? queryLogs.map((el, i) => {
            return <QueryLog
              key={i}
              timestamp={el[0]}
              latency={el[2]}
            />
          }): <div></div>}
        </div>
    </div>
  )
}

// function QLogsSectionHeader({ index, sectionName, sectionNameDisplay }) {

//   return (
//     <div id="qlog-section-header">
//       <h3>{sectionNameDisplay}</h3>
//     </div>
//   );
// }

// function QLogsInfo({ hardCodeTest }) {
//   return (
//     <div id="qlog-info-row">
//       <div id="qlog-info-timestamp">{hardCodeTest[0]}</div>
//       <div id="qlog-info-name">{hardCodeTest[1]}</div>
//       <div id="qlog-info-latency">{hardCodeTest[2]}</div>
//       <div id="qlog-info-depth">{hardCodeTest[3]}</div>
//     </div>
//   );
// }

export default QLogsContainer;