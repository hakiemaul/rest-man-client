import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

import CashierDashboard from '../src/screens/CashierDashboard'

describe('Cashier dashboard screen test', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <CashierDashboard />
    ).toJSON();
    expect(tree).toMatchSnapshot()
  })
})