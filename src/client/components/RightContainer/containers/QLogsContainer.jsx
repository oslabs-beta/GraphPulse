import React from "react";


function QLogsContainer() {
  const sectionNames = ['Timestamp', 'Name', 'Latency', 'Depth'];
  const sectionNamesDisplay = ['Timestamp', 'Name', 'Latency', 'Depth'];
  const hardCodeTest = [
    ['1985-09-25 17:45:30.005', 'Test Query', '145', '7'],
    ['1985-09-25 17:45:30.005', 'Test Query', '145', '7'],
    ['1985-09-25 17:45:30.005', 'Test Query', '145', '7'],
    ['1985-09-25 17:45:30.005', 'Test Query', '145', '7'],
    ['1985-09-25 17:45:30.005', 'Test Query', '145', '7'],
    ['1985-09-25 17:45:30.005', 'Test Query', '145', '7'],
    ['1985-09-25 17:45:30.005', 'Test Query', '145', '7'],
    ['1985-09-25 17:45:30.005', 'Test Query', '145', '7'],
    ['1985-09-25 17:45:30.005', 'Test Query', '145', '7'],
    ['1985-09-25 17:45:30.005', 'Test Query', '145', '7'],
    ['1985-09-25 17:45:30.005', 'Test Query', '145', '7'],
    ['1985-09-25 17:45:30.005', 'Test Query', '145', '7'],
    ['1985-09-25 17:45:30.005', 'Test Query', '145', '7']
  ];

  const sections = [];
  for (let i = 0; i < sectionNames.length; i++) {
    sections.push(<QLogsSectionHeader 
      key={i}
      index={i} 
      // hardCodeTestLength={hardCodeTest.length} 
      sectionName={sectionNames[i]} 
      sectionNameDisplay={sectionNamesDisplay[i]} 
      hardCodeTest={hardCodeTest} 
      />)
  }

  const infoRow = [];

  for (let i = 0; i < hardCodeTest.length; i++) {
    infoRow.push(<QLogsInfo key={i} hardCodeTest={hardCodeTest[i]} />);
  }

  return (
    <>

    <div id="qlog-headers-container">
        {sections}
    </div>

    <div id="qlog-container">
      <div id="qlog-info-container">
        {infoRow}
      </div>
    </div>
    
    </>
  )
}

function QLogsSectionHeader({ index, sectionName, sectionNameDisplay }) {

  return (
    <div id="qlog-section-header">
      <h3>{sectionNameDisplay}</h3>
    </div>
  );
}

function QLogsInfo({ hardCodeTest }) {
  return (
    <div id="qlog-info-row">
      <div id="qlog-info-timestamp">{hardCodeTest[0]}</div>
      <div id="qlog-info-name">{hardCodeTest[1]}</div>
      <div id="qlog-info-latency">{hardCodeTest[2]}</div>
      <div id="qlog-info-depth">{hardCodeTest[3]}</div>
    </div>
  );
}

export default QLogsContainer;