import React from 'react';
import { shallow } from 'enzyme';

import MenuBody from './MenuBody';

describe('<MenuBody> component', () => {
    const menuBody_wrapper = shallow(<MenuBody />)

    it('render MenuBody succesfully', () => {
      expect(menuBody_wrapper).toHaveLength(1)
    });
});
