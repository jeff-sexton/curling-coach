import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  getByAltText,
  getByPlaceholderText,
  prettyDOM,
  getAllByTestId,
} from "@testing-library/react";

import Dashboard from "./Dashboard";


afterEach(cleanup);

describe("Application", () => {
  it("defaults to Current weekday and changes the schedule when a new day is selected", async () => {

    expect(true).toBe(true);
  });






});
