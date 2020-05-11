import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ScoreBoard from './ScoreBoard';


storiesOf('Score Board', module)
  .add('Score Board', () => <ScoreBoard />)