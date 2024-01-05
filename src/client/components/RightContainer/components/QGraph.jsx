import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

// this is dummy data
const data = {
  name: "Eve",
  children: [
    { name: "Cain" },
    { 
      name: "Seth",
      children: [ 
        {name: "Enos"}, {name: "Noam"}
      ]
    },
    { name: "Abel" },
    { 
      name: "Awan",
      children: [{ name: "Enoch" }]
    },
    { name: "Azura" }
  ]
};

const root = d3.hierarchy(data);
const tree = d3.tree().size([640, 400]);

export default function QGraph() {
  const nodesRef = useRef();
  const linksRef = useRef();

  useEffect(() => {
    d3.select(nodesRef.current)
      .selectAll('circle.node')
      .data(root.descendants())
      .join('circle')
      .classed('node', true)
      .attr('cx', d => d.y + 5)
      .attr('cy', d => d.x)
      .attr('r', 5);
    
    d3.select(linksRef.current)
      .selectAll('line.link')
      .data(root.links())
      .join('line')
      .classed('link', true)
      .attr('x1', d => d.source.y)
      .attr('y1', d => d.source.x)
      .attr('x2', d => d.target.y + 5)
      .attr('y2', d => d.target.x);

    d3.select(nodesRef.current)
      .selectAll('text.label')
      .data(root.descendants())
      .join('text')
      .classed('tree-label', true)
      .attr('x', d => d.y)
      .attr('y', d => d.x - 10)
      .text(d => d.data.name);
  }, [])

  
  return (
    <svg width='600' height='800'>
      <path fill="none" stroke="currentColor" strokeWidth={'1.5'} d={tree(root)} />
      <g className="links" ref={linksRef}></g>
      <g className="nodes" ref={nodesRef}></g>
    </svg>
  )
}