export const getTerm = (): string | null => {
  return localStorage.getItem('searchTerm');
};

export const setTerm = (value: string): void => {
  localStorage.setItem('searchTerm', value);
};
