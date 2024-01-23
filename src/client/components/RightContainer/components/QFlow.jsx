import React, { useCallback } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Background
} from 'reactflow';

import 'reactflow/dist/style.css'

const initialNodes = [];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2'}];

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

let height = 0;
const helper = (data, depth = 0) => {
  const keys = Object.keys(data);
  keys.forEach((key, i) => {
    // console.log(nodes);
    if (!Array.isArray(data[key])) {
      initialNodes.push({
        id: `${key}: ${data[key]}`,
        position: {
          x: depth * 50,
          y: height * 50
        },
        data: {
          label: `${key}: ${data[key]}`
        }
      });
      height++;
    } else {
      data[key].forEach(prop => {
        helper(prop, depth + 1);
      });
    }
  })
}
helper(dummyData.data);
console.log('nodes:', initialNodes);

export default function QFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
 
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Background variant='dots' gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}