import React from 'react';

import { storiesOf } from '@storybook/react';

import StrategyBoard from './StrategyBoard';
import IceSurface from './IceSurface';
import Rock from './Rock';

storiesOf('Strategy Board', module)
  .add('Strategy Board', () => <StrategyBoard />)
  .add('Ice Surface', () => <IceSurface />)
  .add('Rock', () => <Rock />);
