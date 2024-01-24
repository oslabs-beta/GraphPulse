import React from 'react';
import { Handle, Position } from 'reactflow';

export default function QFlowNode({ data, isConnectable }) {
  return (
    <div>
      <Handle
        type='target'
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Handle 
        type='source'
        position={Position.Bottom}
        id='a'
        isConnectable={isConnectable}
      />
      <Handle 
        type='source'
        position={Position.Bottom}
        id='b'
        isConnectable={isConnectable}
      />
    </div>
  )
}