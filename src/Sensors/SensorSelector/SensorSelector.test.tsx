import React from 'react'
import {
  render,
  screen,
} from '@testing-library/react'
import SensorSelector from './SensorSelector'

test('SensorSelector renders', () => {
  const tree = render(<SensorSelector/>)

  const heading = tree.getByText('Sensor Selector')
  expect(heading).toBeInTheDocument()
})

