import React, { useMemo } from 'react';
import { Handle, Position } from 'reactflow';

export default function QFlowNode({ data, isConnectable }) {
  return (
    <div className='qflow-node'>
      <Handle
        type='target'
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <div>
        <label htmlFor="label">{data.label}</label>
      </div>
      <Handle 
        type='source'
        position={Position.Right}
        id='a'
        isConnectable={isConnectable}
        style={{ top: 10 }}
      />
      <Handle 
        type='source'
        position={Position.Right}
        id='b'
        isConnectable={isConnectable}
        style={{ top: 50 }}
      />
    </div>
  )
}