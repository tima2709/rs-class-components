import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/pagination/pagination';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';

describe('Pagination Component', () => {
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
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('9')).toBeInTheDocument();
    expect(screen.getByText('next page')).toBeInTheDocument();
  });

  it('disables prev page button on first page', () => {
    const setPage = vi.fn();
    render(<Pagination page={1} setPage={setPage} />);
    expect(screen.getByText('prev page')).toBeDisabled();
  });

  it('disables next page button on last page', () => {
    const setPage = vi.fn();
    render(<Pagination page={9} setPage={setPage} />);
    expect(screen.getByText('next page')).toBeDisabled();
  });

  it('calls setPage with correct argument when page buttons are clicked', () => {
    const setPage = vi.fn();
    render(<Pagination page={5} setPage={setPage} />);
    fireEvent.click(screen.getByText('prev page'));
    expect(setPage).toHaveBeenCalledWith(4);
    fireEvent.click(screen.getByText('next page'));
    expect(setPage).toHaveBeenCalledWith(6);
    fireEvent.click(screen.getByText('1'));
    expect(setPage).toHaveBeenCalledWith(1);
    fireEvent.click(screen.getByText('9'));
    expect(setPage).toHaveBeenCalledWith(9);
  });

  it('disables buttons for the current page', () => {
    const setPage = vi.fn();
    render(<Pagination page={5} setPage={setPage} />);
    expect(screen.getByText('5')).toBeDisabled();
  });

  it('enables next page button when not on last page', () => {
    const setPage = vi.fn();
    render(<Pagination page={5} setPage={setPage} />);
    expect(screen.getByText('next page')).not.toBeDisabled();
  });

  it('enables prev page button when not on first page', () => {
    const setPage = vi.fn();
    render(<Pagination page={5} setPage={setPage} />);
    expect(screen.getByText('prev page')).not.toBeDisabled();
  });

  it('does not go below page 1', () => {
    const setPage = vi.fn();
    render(<Pagination page={1} setPage={setPage} />);
    fireEvent.click(screen.getByText('prev page'));
    expect(setPage).not.toHaveBeenCalledWith(0);
  });

  it('does not exceed the maximum page number', () => {
    const setPage = vi.fn();
    render(<Pagination page={9} setPage={setPage} />);
    fireEvent.click(screen.getByText('next page'));
    expect(setPage).not.toHaveBeenCalledWith(10);
  });
});
