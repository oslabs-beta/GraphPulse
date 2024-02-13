import React from "react";

export default function QueryLog({ latency }) {

  return (
    <div id="query-log">
      <div>{new Date()}</div>
      <div>Test Query</div>
      <div>{latency} ms</div>
    </div>
  );
}