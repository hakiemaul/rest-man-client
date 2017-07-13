import React from 'react';
import { shallow } from 'enzyme';

import TopBar from './TopBar';

describe('<TopBar> component', () => {
  const topBar_wrapper = shallow(<TopBar />)

  it('render TopBar successfully', () => {
    expect(topBar_wrapper).toHaveLength(1)
  });

});
