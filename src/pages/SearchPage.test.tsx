import { render, screen } from '@testing-library/react';
import SearchPage from './SearchPage';
import { MemoryRouter } from 'react-router-dom';

describe('SearchPage', () => {
  it('renders Search component', () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Search/i)).toBeInTheDocument();
  });
});
