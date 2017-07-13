import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import MenuSelection from '../src/screens/MenuSelection'

describe('Menu Selection screen test', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <MenuSelection />
    ).toJSON();
    expect(tree).toMatchSnapshot()
  })
})