import React, { Component } from 'react';
import Search from './components/search/search';
import Result from './components/result/result';
import './App.css';

interface State {
  hasError: boolean;
}

class App extends Component<NonNullable<unknown>, State> {
  state: State = {
    hasError: false,
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Something went wrong:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }
    return (
      <div>
        <Search />
        <Result />
      </div>
    );
  }
}

export default App;
