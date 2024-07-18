import { render, screen } from '@testing-library/react';
import NotFoundPage from '../pages/404-page';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';

describe('NotFoundPage Component', () => {
  it('renders not found message', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('not found')).toBeInTheDocument();
  });
});
