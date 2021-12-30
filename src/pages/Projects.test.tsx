import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import reposReducer from "../store/slices/reposSlice";
import dummyData from "./testingState";
import Projects from "./Projects";

const reducer = combineReducers({
    // here we will be adding reducers
    repos: reposReducer
})
const preloadedStore = configureStore({
    reducer,
    preloadedState: dummyData
});

const store = configureStore({
  reducer
});

describe("Projects page", () => {
    beforeEach(() => {
        global.scrollTo = jest.fn();
      });
      it("should render when the user has repos", async() => {
        const history = createMemoryHistory();
        history.push("/projects");
        render(
          <Provider store={preloadedStore}>
            <Router location={history.location} navigator={history}>
              <Projects />
            </Router>
          </Provider>
        );
        expect(screen.getByTestId('projects-container')).toBeInTheDocument();
      })
});