import {
  render,
  screen,
  fireEvent,
  queryByAttribute,
  wrapper
} from "@testing-library/react";
import App from "./App";

test("Only host-selected genres are displayed", () => {
  const result = render(<App />);
  
  setGenres(['Action', 'Fantasy']);
  const genres = wrapper.find("div.genre_card");

  expect(submitButton).toBeInTheDocument();
  fireEvent.click(submitButton);
  expect(submitButton).toBeInTheDocument();
});

