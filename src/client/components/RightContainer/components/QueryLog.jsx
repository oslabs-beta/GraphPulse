import React from "react";

export default function QueryLog({ timestamp, latency }) {

  return (
    <div id="query-log">
      <div>{timestamp}</div>
      <div>Test Query</div>
      <div>{latency} ms</div>
    </div>
  );
}