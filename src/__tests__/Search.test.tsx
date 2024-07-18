import { render, screen } from '@testing-library/react';
import Search from '../components/search/search';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

vi.mock('@uidotdev/usehooks', () => ({
  useLocalStorage: vi.fn(() => ['', vi.fn()]),
}));

describe('Search Component', () => {
  it('renders input field', () => {
    render(<Search />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });
});
