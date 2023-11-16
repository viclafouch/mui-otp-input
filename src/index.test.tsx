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

  test('should pass aria-label, aria-labelledby and aria-describedby to inputs when passing it via TextFieldsProps', () => {
    render(
      <MuiOtpInput
        value="abcd"
        TextFieldsProps={{
          'aria-label': 'this is aria label',
          'aria-labelledby': 'this is aria labelledby',
          'aria-describedby': 'this is aria describedby'
        }}
      />
    )
    expect(testUtils.getInputElementByIndex(0)).toHaveAttribute(
      'aria-label',
      'this is aria label'
    )
    expect(testUtils.getInputElementByIndex(0)).toHaveAttribute(
      'aria-labelledby',
      'this is aria labelledby'
    )
    expect(testUtils.getInputElementByIndex(0)).toHaveAttribute(
      'aria-describedby',
      'this is aria describedby'
    )
  })

  test('should pass aria-label, aria-labelledby and aria-describedby to inputs when passing a function with an index via TextFieldsProps', () => {
    render(
      <MuiOtpInput
        value="abcd"
        TextFieldsProps={{
          'aria-label': (index) => {
            return `this is aria label ${index + 1}`
          },
          'aria-labelledby': (index) => {
            return `this is aria labelledby ${index + 1}`
          },
          'aria-describedby': (index) => {
            return `this is aria describedby ${index + 1}`
          }
        }}
      />
    )
    expect(testUtils.getInputElementByIndex(0)).toHaveAttribute(
      'aria-label',
      'this is aria label 1'
    )
    expect(testUtils.getInputElementByIndex(0)).toHaveAttribute(
      'aria-labelledby',
      'this is aria labelledby 1'
    )
    expect(testUtils.getInputElementByIndex(0)).toHaveAttribute(
      'aria-describedby',
      'this is aria describedby 1'
    )
    expect(testUtils.getInputElementByIndex(1)).toHaveAttribute(
      'aria-label',
      'this is aria label 2'
    )
    expect(testUtils.getInputElementByIndex(1)).toHaveAttribute(
      'aria-labelledby',
      'this is aria labelledby 2'
    )
    expect(testUtils.getInputElementByIndex(1)).toHaveAttribute(
      'aria-describedby',
      'this is aria describedby 2'
    )
    expect(testUtils.getInputElementByIndex(2)).toHaveAttribute(
      'aria-label',
      'this is aria label 3'
    )
    expect(testUtils.getInputElementByIndex(2)).toHaveAttribute(
      'aria-labelledby',
      'this is aria labelledby 3'
    )
    expect(testUtils.getInputElementByIndex(2)).toHaveAttribute(
      'aria-describedby',
      'this is aria describedby 3'
    )
    expect(testUtils.getInputElementByIndex(3)).toHaveAttribute(
      'aria-label',
      'this is aria label 4'
    )
    expect(testUtils.getInputElementByIndex(3)).toHaveAttribute(
      'aria-labelledby',
      'this is aria labelledby 4'
    )
    expect(testUtils.getInputElementByIndex(3)).toHaveAttribute(
      'aria-describedby',
      'this is aria describedby 4'
    )
  })
})
