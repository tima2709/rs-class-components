import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import React from 'react';

describe('Main Entry Point', () => {
  beforeEach(() => {
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('renders without crashing', () => {
    const rootElement = document.getElementById('root');
    expect(rootElement).not.toBeNull();

    if (rootElement) {
      expect(() => {
        ReactDOM.createRoot(rootElement).render(
          <React.StrictMode>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </React.StrictMode>,
        );
      }).not.toThrow();
    }
  });
});
