import React, { useCallback, useState, useMemo } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  applyEdgeChanges,
  applyNodeChanges
} from 'reactflow';

import 'reactflow/dist/style.css';
import QFlowNode from './QFlowNode';

const initialNodes = [];
const initialEdges = [];

const dummyData = {
  "data": {
    "users": [
      {
        "id": "1",
        "queryLogs": [
          {
            "query_name": "Query 1 for User 1",
            "latency": 50
          },
          {
            "query_name": "Query 2 for User 1",
            "latency": 70
          }
        ]
      },
      {
        "id": "2",
        "queryLogs": [
          {
            "query_name": "Query 1 for User 2",
            "latency": 80
          }
        ]
      },
      {
        "id": "3",
        "queryLogs": [
          {
            "query_name": "Query 1 for User 3",
            "latency": 60
          },
          {
            "query_name": "Query 2 for User 3",
            "latency": 70
          }
        ]
      },
      {
        "id": "4",
        "queryLogs": [
          {
            "query_name": "Query 1 for User 4",
            "latency": 90
          },
          {
            "query_name": "Query 2 for User 4",
            "latency": 55
          }
        ]
      },
      {
        "id": "5",
        "queryLogs": [
          {
            "query_name": "Query 1 for User 5",
            "latency": 75
          },
          {
            "query_name": "Query 2 for User 5",
            "latency": 65
          }
        ]
      },
      {
        "id": "6",
        "queryLogs": [
          {
            "query_name": "Query 1 for User 6",
            "latency": 85
          },
          {
            "query_name": "Query 2 for User 6",
            "latency": 70
          }
        ]
      },
      {
        "id": "7",
        "queryLogs": [
          {
            "query_name": "Query 1 for User 7",
            "latency": 80
          },
          {
            "query_name": "Query 2 for User 7",
            "latency": 75
          }
        ]
      },
      {
        "id": "8",
        "queryLogs": [
          {
            "query_name": "Query 1 for User 8",
            "latency": 70
          },
          {
            "query_name": "Query 2 for User 8",
            "latency": 90
          }
        ]
      },
      {
        "id": "9",
        "queryLogs": [
          {
            "query_name": "Query 1 for User 9",
            "latency": 95
          },
          {
            "query_name": "Query 2 for User 9",
            "latency": 80
          },
          {
            "query_name": "Query 3 for User 9",
            "latency": 80
          },
          {
            "query_name": "Query 4 for User 9",
            "latency": 40
          }
        ]
      },
      {
        "id": "10",
        "queryLogs": [
          {
            "query_name": "Query 1 for User 10",
            "latency": 85
          },
          {
            "query_name": "Query 2 for User 10",
            "latency": 100
          }
        ]
      }
    ]
  }
}

const nodeTypes = { qFlowNode: QFlowNode };
let height = 1;
const targetNodeQueue = [];
(function helper (data, depth = 0) {
  const keys = Object.keys(data);
  let sourceNode = `${depth - 1}, ${(height - 1)}`;
  keys.forEach(key => {
    if (!Array.isArray(data[key])) {
      // sourceNode = `${depth - 1}, ${(height - 1)}`;
      initialNodes.push({
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
      targetNodeQueue.push(`${depth}, ${height}`);
    } else {
      sourceNode = `${depth}, ${height - 1}`;
      targetNodeQueue.push(`${depth + 1}, ${height}`);
      data[key].forEach(prop => {
        helper(prop, depth + 1);
        while (targetNodeQueue.length) {
          initialEdges.push({
            id: `${sourceNode} - ${targetNodeQueue[0]}`,
            source: sourceNode,
            target: targetNodeQueue.shift()
          });
        }
      });
    }
  })
})(dummyData.data); // insert graphql response here

export default function QFlow({results}) {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
 
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
    >
      <Background variant='dots' gap={12} size={1} />
    </ReactFlow>
  );
}