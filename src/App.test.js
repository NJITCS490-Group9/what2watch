import {
  render,
  screen,
  fireEvent,
  queryByAttribute,
  wrapper,
} from "@testing-library/react";

import App from "./App";

test("Confirm Login screen continue button is showing correctly", () => {
  const result = render(<App />);
  const continueButton = screen.getByText("Continue");

  expect(continueButton).toBeInTheDocument();
  fireEvent.click(continueButton);
  expect(continueButton).not.toBeInTheDocument();
});

test("Confirm VotingScreen does not appear at the start", () => {
  const result = render(<App />);
  const continueButton = screen.getByText("Continue");
  const voteSubmitButton = screen.queryByText("Submit Vote");

  expect(continueButton).toBeInTheDocument();
  expect(voteSubmitButton).toBeNull();
  fireEvent.click(continueButton);
  expect(continueButton).not.toBeInTheDocument;
  expect(voteSubmitButton).toBeNull();
});
