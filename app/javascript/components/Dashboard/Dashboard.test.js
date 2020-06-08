/* global expect */
/* global jest */

import React from 'react';

import { render, cleanup, fireEvent } from '@testing-library/react';

import Dashboard from './Dashboard';

import gameData from '../../__mocks__/dashboardViewSeed';

afterEach(cleanup);

describe('Dashboard', () => {
  it('Loads games with the correct data displayed', () => {
    const { getByText } = render(<Dashboard gameList={gameData} />);

    expect(getByText(gameData[0].location)).toBeInTheDocument();
  });
  it('Loads the correct number of games from the sample data', () => {
    const { getAllByTestId } = render(<Dashboard gameList={gameData} />);

    expect(getAllByTestId('game-preview')).toHaveLength(gameData.length);
  });

  it('Sets the game id of a clicked preview', () => {
    const handleGameSelection = jest.fn();
    const { getByText } = render(
      <Dashboard
        gameList={gameData}
        handleGameSelection={handleGameSelection}
      />
    );

    fireEvent.click(getByText(gameData[0].location));

    expect(handleGameSelection).toHaveBeenCalledTimes(1);
    expect(handleGameSelection).toHaveBeenCalledWith(gameData[0].id);
  });
  it('Sets the game id of a clicked stats button', () => {
    const handleStatsSelection = jest.fn();
    const { getAllByText } = render(
      <Dashboard
        gameList={gameData}
        handleStatsSelection={handleStatsSelection}
      />
    );

    fireEvent.click(getAllByText('Stats')[1]);

    expect(handleStatsSelection).toHaveBeenCalledTimes(1);
    expect(handleStatsSelection).toHaveBeenCalledWith(gameData[1].id);
  });
});
