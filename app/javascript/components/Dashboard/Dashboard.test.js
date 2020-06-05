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

import gameData from '../../__mocks__/dashboardViewSeed';



afterEach(cleanup);

describe("Dashboard", () => {
  it("Loads a list of games", async () => {
    const { getByText } = render(<Dashboard gameList={gameData}/>);
    // await waitForElement(() => getByText("Dashboard"));
    expect(getByText(/Calgary/i));
  });






});
