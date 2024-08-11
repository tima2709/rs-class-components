import { ReactNode } from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import store from '../redux/store';

interface WrapperProps {
  children: ReactNode;
}

function render(ui, { route = '/', path = '/', ...renderOptions } = {}) {
  window.history.pushState({}, 'Test page', route);

  function Wrapper({ children }: WrapperProps) {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path={path} element={children} />
          </Routes>
        </BrowserRouter>
      </Provider>
    );
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';
export { render };
