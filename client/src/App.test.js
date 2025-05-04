import { render, screen } from '@testing-library/react';
import App from './App';

test('renders InterviewIQ welcome text', () => {
  render(<App />);
  expect(screen.getByText(/Welcome to/i)).toBeInTheDocument();
  expect(screen.getByText(/InterviewIQ/i)).toBeInTheDocument();
});
