import { screen } from '@testing-library/react'

export function getInputElementByIndex(index: number) {
  return screen.getAllByRole<HTMLInputElement>('textbox')[index]
}
