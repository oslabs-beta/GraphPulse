import React, { useCallback, useEffect } from 'react';
import '../../../styles/RightContainer.css';
import ReactFlow, {
  addEdge,
  Background,
  useNodesState,
  useEdgesState
} from 'reactflow';

import 'reactflow/dist/style.css';
      
export default function QFlow({ results }) {
  const initialNodes = [];
  const initialEdges = [];
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const clearGraph = () => {
    setNodes([]);
    setEdges([]);
  };

  function queryToFlow (
    data,
    depth = 0,
    height = 1,
    targetNodeQueue = [],
    newNodes = [],
    newEdges = []
  ) {
    console.log('processing: ', data);
    const keys = Object.keys(data);
    let sourceNode = `${depth - 1}, ${(height - 1)}`;
    // TO-DO: extremely nested query results are still troublesome.
    keys.forEach(key => {
      if (Array.isArray(data[key])) {
        newNodes.push({
          id: `${depth}, ${height}`,
          position: {
            x: depth * 150,
            y: height * 50
          },
          data: {
            label: `${key}:`
          }
        });
        height++;
        sourceNode = `${depth}, ${height - 1}`;
        targetNodeQueue.push(`${depth + 1}, ${height}`);
        
        for (const obj of data[key]) {
          queryToFlow(obj, depth + 1, height++, targetNodeQueue, newNodes, newEdges);
        }
      } else if (typeof data[key] === 'object' && data[key] !== null) {
        newNodes.push({
          id: `${depth}, ${height}`,
          position: {
            x: depth * 150,
            y: height * 50
          },
          data: {
            label: `${key}:`
          }
        });
        height++;
        sourceNode = `${depth}, ${height - 1}`;
        targetNodeQueue.push(`${depth + 1}, ${height}`);
        queryToFlow(data[key], depth + 1, height, targetNodeQueue, newNodes, newEdges);
      } else {
        if (key !== '__typename') {
          newNodes.push({
            id: `${depth}, ${height}`,
            position: {
              x: depth * 150,
              y: height * 50
            },
            data: {
              label: `${key}: ${data[key]}`
            }
          });
          height++;
          newEdges.push({
            id: `${sourceNode} - ${depth}, ${height}`,
            source: sourceNode,
            target: `${depth}, ${height}`,
            animated: true
          });
        }
      }
      while (targetNodeQueue.length) {
        newEdges.push({
          id: `${sourceNode} - ${targetNodeQueue[0]}`,
          source: sourceNode,
          target: targetNodeQueue.shift(),
          animated: true
        });
      }
    });
    setNodes(newNodes);
    setEdges(newEdges);
  }
  
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    []
  );
        
  useEffect(() => {
    console.log('what did we get as our result?', results);
    while (Array.isArray(results) && Array.isArray(results[0])) {
      results = results[0];
    }

    setNodes([]);
    setEdges([]);

    if (results) {
      if (Array.isArray(results)) {
        queryToFlow(results);
      } else results.forEach(obj => queryToFlow(obj));
    } 
  }, [results]);

  return (
   <>
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      defaultViewport={{
        x: 400,
        y: 50,
        zoom: 0.5
      }}
    >

      <Background variant='dots' gap={12} size={1} />
    </ReactFlow>
    <button id="clear-graph-btn" style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1 }} onClick={clearGraph}>Clear Graph</button>
    </>
  );
}