import React, { Component } from 'react';

interface InputType {
  value: string;
}

class Search extends Component<NonNullable<unknown>, InputType> {
  state: InputType = {
    value: localStorage.getItem('value') || '',
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.target.value });
  };

  handleSearch = () => {
    const searchedTerm = this.state.value.trim();
    localStorage.setItem('value', searchedTerm);
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}

export default Search;
