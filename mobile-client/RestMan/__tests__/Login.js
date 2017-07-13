import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import Login from '../src/screens/Login'

describe('Login screen test', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Login />
    ).toJSON();
    expect(tree).toMatchSnapshot()
  })
  it('should have a login button', () => {
    const wrapper = shallow(<Login />)
    const oneButton = wrapper.find('Button')
    expect(oneButton).toHaveLength(1)
  })
})