/**
 * @jest-environment jsdom
 */

global.ResizeObserver = class ResizeObserver {
  observe() {

  }
  unobserve() {

  }
  disconnect() {

  }
};

import { render, fireEvent, screen } from '@testing-library/react';
import QLogsContainer from '../src/client/components/RightContainer/containers/QLogsContainer.jsx';
import QFlow from '../src/client/components/RightContainer/components/QFlow.jsx';
import '@testing-library/jest-dom';
import fetch from 'node-fetch';

global.fetch = fetch;

// This block tests the rendering of QLogsContainer

describe('QLogsContainer', () => {
  it('renders nothing when there are no query logs', () => {
    render(<QLogsContainer isGuest={false} queryLogs={[]} />);
    const tableData = screen.queryByText('No data available');
    expect(tableData).toBeInTheDocument();
  });

  it('renders query logs when user is not a guest', () => {
    const queryLogs = [{timestamp: 'timestamp', endpoint: 'endpoint', latency: 'latency', depth: 'depth'}];
    render(<QLogsContainer isGuest={false} queryLogs={queryLogs} />);
    const tableData = screen.getByText('endpoint');
    expect(tableData).toBeInTheDocument();
  });

  it('renders new query log when added', () => {
    const initialLogs = [];
    const { rerender } = render(<QLogsContainer isGuest={false} queryLogs={initialLogs} />);
    const newLog = {timestamp: 'newTimestamp', endpoint: 'newEndpoint', latency: 'newLatency', depth: 'newDepth'};
    rerender(<QLogsContainer isGuest={false} queryLogs={[...initialLogs, newLog]} />);
    const tableData = screen.getByText('newEndpoint');
    expect(tableData).toBeInTheDocument();
  });

  it('does not render deleted query log', () => {
    const initialLog = {timestamp: 'initialTimestamp', endpoint: 'initialEndpoint', latency: 'initialLatency', depth: 'initialDepth'};
    const { rerender } = render(<QLogsContainer isGuest={false} queryLogs={[initialLog]} />);
    rerender(<QLogsContainer isGuest={false} queryLogs={[]} />);
    const tableData = screen.queryByText('initialEndpoint');
    expect(tableData).not.toBeInTheDocument();
  });

});

// This block tests the rendering of QFlow

describe('QFlow', () => {
  it('updates when results prop changes', () => {
    const { rerender } = render(<QFlow results={[]} />);
    expect(screen.queryByText(/data/i)).not.toBeInTheDocument();

    rerender(<QFlow results={[{ data: 'New data' }]} />);
    expect(screen.getByText(/New data/i)).toBeInTheDocument();
  });
});