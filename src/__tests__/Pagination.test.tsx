import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from '../components/pagination/pagination';
import { describe, it, expect, vi } from 'vitest';

describe('Pagination', () => {
  it('renders pagination buttons', () => {
    const setPage = vi.fn();
    render(<Pagination page={1} setPage={setPage} />);

    expect(screen.getByText('prev page')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('next page')).toBeInTheDocument();
  });

  it('disables prev button on the first page', () => {
    const setPage = vi.fn();
    render(<Pagination page={1} setPage={setPage} />);

    expect(screen.getByText('prev page')).toBeDisabled();
    expect(screen.getByText('1')).toBeDisabled();
  });

  it('calls setPage with correct value on button click', () => {
    const setPage = vi.fn();
    render(<Pagination page={1} setPage={setPage} />);

    fireEvent.click(screen.getByText('2'));
    expect(setPage).toHaveBeenCalledWith(2);

    fireEvent.click(screen.getByText('next page'));
    expect(setPage).toHaveBeenCalledWith(2);

    fireEvent.click(screen.getByText('3'));
    expect(setPage).toHaveBeenCalledWith(3);

    fireEvent.click(screen.getByText('4'));
    expect(setPage).toHaveBeenCalledWith(4);

    fireEvent.click(screen.getByText('5'));
    expect(setPage).toHaveBeenCalledWith(5);

    fireEvent.click(screen.getByText('6'));
    expect(setPage).toHaveBeenCalledWith(6);

    fireEvent.click(screen.getByText('7'));
    expect(setPage).toHaveBeenCalledWith(7);
  });

  it('disables buttons correctly', () => {
    const setPage = vi.fn();
    render(<Pagination page={3} setPage={setPage} />);

    expect(screen.getByText('3')).toBeDisabled();
    expect(screen.getByText('prev page')).not.toBeDisabled();
    expect(screen.getByText('next page')).not.toBeDisabled();
  });

  it('handles edge cases correctly', () => {
    const setPage = vi.fn();
    render(<Pagination page={7} setPage={setPage} />);

    expect(screen.getByText('next page')).toBeDisabled();
  });

  it('displays correct active page', () => {
    const setPage = vi.fn();
    render(<Pagination page={4} setPage={setPage} />);

    expect(screen.getByText('4')).toBeDisabled();
  });
});
