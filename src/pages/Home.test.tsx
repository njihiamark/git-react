import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import store from "../store";
import Home from "./Home";

describe("Homepage", () => {
  beforeEach(() => {
    const history = createMemoryHistory();
    history.push("/");
    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Home />
        </Router>
      </Provider>
    );
  })
  it("should render Homepage", () => {
    expect(screen.getByText(/Github Username/i)).toBeInTheDocument();
  });
  it("should show a message when username does not exist and when username has no repos", async() => {
    const input = screen.getByLabelText("Github Username");
    const submitButton = screen.getByTestId('btn-submit');
    fireEvent.change(input, {target: {value: 'njihiama'}});
    fireEvent.click(submitButton);
    await waitFor(() => {expect(screen.getByText('*You might have mistyped the username or the github API Rate limit has been reached')).toBeInTheDocument()});
    fireEvent.change(input, {target: {value: 'njihia'}});
    fireEvent.click(submitButton);
    await waitFor(() => {expect(screen.getByText('This user has no repos')).toBeInTheDocument()});
  });
});
