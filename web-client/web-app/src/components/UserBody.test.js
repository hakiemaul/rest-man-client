import React from 'react';
import { shallow } from 'enzyme';

import UserBody from './UserBody'

describe('<UserBody> component', () => {
    const userBody_wrapper = shallow(<UserBody />)

    it('render UserBody successfully', () => {
      expect(userBody_wrapper).toHaveLength(1)
    });
});
