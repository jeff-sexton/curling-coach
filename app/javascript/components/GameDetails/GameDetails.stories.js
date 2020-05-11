import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import GameDetails from './GameDetails';


storiesOf('Game Details', module)
  .add('Game Details', () => <GameDetails setRating={action('value')} />)