import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "../Counter";

test("increments count when button is clicked", () => {
  render(<Counter />);

  // Find the button by its role and initial text
  const button = screen.getByRole("button", { name: /count is 0/i });

  // Assert that the initial count is 0
  expect(button).toHaveTextContent("count is 0");

  // Simulate a click on the button
  fireEvent.click(button);

  // Assert that the count has incremented to 1
  expect(button).toHaveTextContent("count is 1");

  // Simulate another click
  fireEvent.click(button);

  // Assert that the count has incremented to 2
  expect(button).toHaveTextContent("count is 2");
});
