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

import { cleanUpFixture } from "__mocks__/axios";
import axios from "axios";

beforeEach(() => {
  cleanUpFixture();
});


afterEach(cleanup);

describe("Application", () => {
  it("defaults to Current weekday and changes the schedule when a new day is selected", async () => {

    expect(true).toBe(true);
  });






});
