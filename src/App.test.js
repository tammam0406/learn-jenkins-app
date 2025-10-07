import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn Jenkins link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn Jenkins/i);
  expect(linkElement).toBeInTheDocument();
});
let timer;
beforeEach(() => {
  timer = setTimeout(() => {}, 1000);
});
afterEach(() => {
  clearTimeout(timer);
});

// Dummy async function for testing
async function someAsyncFunction() {
  return Promise.resolve();
}

test('async test', async () => {
  await someAsyncFunction();
});
