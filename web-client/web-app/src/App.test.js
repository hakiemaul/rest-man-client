import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import App from './App';

describe('<App> component',() => {
  const app_wrapper = shallow(<App />)

  it('render App successfully', () => {
    expect (app_wrapper).toHaveLength(1);
  });

});
