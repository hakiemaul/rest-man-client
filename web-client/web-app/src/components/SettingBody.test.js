import React from 'react';
import { shallow } from 'enzyme';

import SettingBody from './SettingBody'

describe('<SettingBody> component', () => {
    const settingBody_wrapper = shallow(<SettingBody />)

    it('render SettingBody successfully', () => {
        expect(settingBody_wrapper).toHaveLength(1);
    });
});
