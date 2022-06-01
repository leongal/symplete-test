import { render, screen } from '@testing-library/react';
import App from './App';

test('renders list items', () => {
  render(<App />);
  expect(screen.getByRole("list")).toBeInTheDocument(`
    <ul>
      <li>
        Showings
      </li>
    </ul>
  `);
});
