import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import SideBar from './SideBar';

describe('<SideBar> component', function() {
  const sideBar_wrapper =  shallow(<SideBar />)

  it('render sideBar successfully',() => {
    expect (sideBar_wrapper).toHaveLength(1)
  })
  
});
