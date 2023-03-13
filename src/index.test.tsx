import React from 'react'
import { render, screen } from '@testing-library/react'

import { MuiOtpInput } from './index'
import * as testUtils from './testUtils'

import '@testing-library/jest-dom'

describe('components/MuiOtpInput', () => {
  test('should not crash', () => {
    render(<MuiOtpInput />)
  })

  test('should display 4 inputs by default', () => {
    render(<MuiOtpInput />)
    expect(screen.getAllByRole('textbox').length).toBe(4)
  })

  test('should display n inputs according to the length prop', () => {
    render(<MuiOtpInput length={5} />)
    expect(screen.getAllByRole('textbox').length).toBe(5)
  })

  test('should split value into different inputs', () => {
    render(<MuiOtpInput value="abcd" />)
    expect(testUtils.getInputElementByIndex(0).value).toBe('a')
    expect(testUtils.getInputElementByIndex(1).value).toBe('b')
    expect(testUtils.getInputElementByIndex(2).value).toBe('c')
    expect(testUtils.getInputElementByIndex(3).value).toBe('d')
  })

  test('should split value into different inputs or let empty value', () => {
    render(<MuiOtpInput value="ab" />)
    expect(testUtils.getInputElementByIndex(0).value).toBe('a')
    expect(testUtils.getInputElementByIndex(1).value).toBe('b')
    expect(testUtils.getInputElementByIndex(2).value).toBe('')
    expect(testUtils.getInputElementByIndex(3).value).toBe('')
  })

  test('should not focus first input by default', () => {
    render(<MuiOtpInput value="abcd" />)
    expect(testUtils.getInputElementByIndex(0)).not.toHaveFocus()
  })

  test('should focus first input according to the autoFocus prop', () => {
    render(<MuiOtpInput value="abcd" autoFocus />)
    expect(testUtils.getInputElementByIndex(0)).toHaveFocus()
  })
})
