import React from 'react'
import { render } from '@testing-library/react'

import { MuiOtpInput } from './index'

import '@testing-library/jest-dom'

describe('components/MuiOtpInput', () => {
  test('should not crash', () => {
    render(<MuiOtpInput />)
  })
})
