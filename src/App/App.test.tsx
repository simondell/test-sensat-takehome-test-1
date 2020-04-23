import React from 'react'
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import { enableFetchMocks } from 'jest-fetch-mock'

import App from './App'

enableFetchMocks()

test('displays Loading whilst it loads', async () => {
  fetchMock.mockResponse(JSON.stringify([{ id: 'foo' }]))
  render(<App />)

  expect(fetchMock).toHaveBeenCalled()

  await waitForElementToBeRemoved(() => screen.getByAltText(/loading/i))
})