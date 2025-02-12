import '@testing-library/jest-dom';

declare global {
  export interface Matchers<R> {
    toBeInTheDocument(): R;
    toHaveStyle(style: object): R;
  }
}
