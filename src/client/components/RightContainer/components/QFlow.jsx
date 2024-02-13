import React, { useCallback, useState, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  useNodesState,
  useEdgesState,
  applyEdgeChanges,
  applyNodeChanges
} from 'reactflow';

import 'reactflow/dist/style.css';
import QFlowNode from './QFlowNode';



const dummyData = {
  "data": {
    "__typename": "Country",
    "name": "Brazil",
    "native": "Brasil",
    "capital": "Brasília",
    "emoji": "🇧🇷",
    "currency": "BRL",
    "languages": [
      {
        "__typename": "Language",
        "code": "pt",
        "name": "Portuguese"
      }
    ]
  }
}      
      
export default function QFlow({ results }) {
  const initialNodes = [];
  const initialEdges = [];
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  // const nodeTypes = { qFlowNode: QFlowNode };

  let height = 1;
  const targetNodeQueue = [];
  const newNodes = [];
  const newEdges = [];
  function helper (data, depth = 0) {
    console.log('processing: ', data);
    const keys = Object.keys(data);
    let sourceNode = `${depth - 1}, ${(height - 1)}`;
    keys.forEach(key => {
      if (!Array.isArray(data[key])) {
        if (key !== '__typename') {
          newNodes.push({
            id: `${depth}, ${height}`,
            position: {
              x: depth * 150,
              y: height * 25
            },
            data: {
              label: `${key}: ${data[key]}`
            }
          });
          height++;
          targetNodeQueue.push(`${depth}, ${height}`);
        }
      } else {
        sourceNode = `${depth}, ${height - 1}`;
        targetNodeQueue.push(`${depth + 1}, ${height}`);
        data[key].forEach(prop => {
          helper(prop, depth + 1);
          while (targetNodeQueue.length) {
            newEdges.push({
              id: `${sourceNode} - ${targetNodeQueue[0]}`,
              source: sourceNode,
              target: targetNodeQueue.shift()
            });
          }
        });
      }
    })
  }  
  
  // const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
  //   [setNodes]
  // );
  // const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
  //   [setEdges]
  // );
  const onConnect = useCallback((params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    []
  );
        
  useEffect(() => {
    console.log('what did we get as our result?', results);
    if (results) {
      if (Array.isArray(results[0])) {
        results[0].forEach(obj => helper(obj));
      } else helper(results[0]);
      setNodes(newNodes);
      setEdges(newEdges);
      helper = 1;
    } 
  }, [results]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      // nodeTypes={nodeTypes}
    >
      <Background variant='dots' gap={12} size={1} />
    </ReactFlow>
  );
}