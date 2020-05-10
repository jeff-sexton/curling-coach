import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ShotDetails from './ShotDetails';
import ShotRating from './ShotRating';
import ShotType from './ShotType';
import ShotRotation from './ShotRotation';

storiesOf('Shot Details', module)
  // .add('Shot Details', () => <ShotDetails />)
  .add('Shot Rating', () => <ShotRating setRating={action('value')} />)
  .add('Shot Type', () => <ShotType setShotType={action('value')} />)
  .add('Shot Rotatin', () => <ShotRotation setShotRotation={action('value')} />);