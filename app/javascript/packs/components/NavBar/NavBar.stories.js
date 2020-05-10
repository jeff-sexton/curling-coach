import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import NavBar from './NavBar';

storiesOf('Nav Bar', module)
  .add('Nav Bar', () => <NavBar setMenu={action('value')} setView={action('value')}/>)