import React from 'react';
import { shallow } from 'enzyme';

import DashBoard from './DashBoard'

describe('<DashBoard> component',() => {
  const dashBoard_wrapper = shallow(<DashBoard />)

  it('render DashBoard successfully',() => {
    expect(dashBoard_wrapper).toHaveLength(1);
  });
});
