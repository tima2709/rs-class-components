import React from 'react';

// Определяем интерфейс для объекта в массиве results
interface Result {
  name: string;
  homeworld: string;
}

// Определяем интерфейс для состояния компонента
interface AppState {
  results: Result[] | null;
}

class App extends React.Component<NonNullable<unknown>, AppState> {
  constructor(props: NonNullable<unknown>) {
    super(props);
    this.state = { results: null };
  }

  render() {
    return (
      <div>
        {this.state.results ? (
          this.state.results.map((result, index) => (
            <div key={result.name}>
              <h2>
                ID: {index + 1} - {result.name}
              </h2>
              <p>{result.homeworld}</p>
            </div>
          ))
        ) : (
          <div>No results</div>
        )}
      </div>
    );
  }
}

export default App;
