import { render, screen } from '@testing-library/react';
import DragDrop from './DragDrop';

test('renders list items', () => {
  render(<DragDrop />);
  expect(screen.getByRole("list")).toBeInTheDocument(`
    <ul>
      <li>
        Offers
      </li>
    </ul>
  `);
});
