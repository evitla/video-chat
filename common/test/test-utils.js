import { render as rtlRender } from '@testing-library/react';

function Providers({ children }) {
  return children;
}

function render(ui, options = {}) {
  return rtlRender(ui, { wrapper: Providers, ...options });
}

export * from '@testing-library/react';
// export { renderHook } from '@testing-library/react-hooks';
export { render };
