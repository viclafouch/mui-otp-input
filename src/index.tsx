import React from 'react'
import Box from '@mui/material/Box'
import TextFieldBox from '@components/TextFieldBox/TextFieldBox'
import { KEYBOARD_KEY } from '@shared/constants/event'
import {
  getFilledArray,
  joinArrayStrings,
  mergeArrayStringFromIndex,
  updateIndex
} from '@shared/helpers/array'
import { split } from '@shared/helpers/string'

import type { BaseMuiOtpInputProps, MuiOtpInputProps } from './index.types'

export type { MuiOtpInputProps }

type ValueSplitted = {
  character: string
  inputRef: React.RefObject<HTMLInputElement>
}[]

const MuiOtpInput = React.forwardRef(
  (props: MuiOtpInputProps, propRef: MuiOtpInputProps['ref']) => {
    const {
      value,
      length,
      onChange,
      TextFieldsProps,
      onComplete,
      validateChar,
      className,
      ...restBoxProps
    } = props

    const {
      onPaste,
      onFocus,
      onKeyDown,
      className: TextFieldClassName,
      ...restTextFieldsProps
    } = TextFieldsProps || {}

    const valueSplitted: ValueSplitted = getFilledArray(
      length as number,
      (_, index) => {
        return {
          character: (value as string)[index] || '',
          inputRef: React.createRef<HTMLInputElement>()
        }
      }
    )

    const getIndexByInputElement = (inputElement: HTMLInputElement) => {
      return valueSplitted.findIndex(({ inputRef }) => {
        return inputRef.current === inputElement
      })
    }

    const getCharactersSplitted = () => {
      return valueSplitted.map(({ character }) => {
        return character
      })
    }

    const replaceCharOfValue = (charIndex: number, charValue: string) => {
      const newValueSplitted = updateIndex(
        getCharactersSplitted(),
        charIndex,
        charValue
      )
      return joinArrayStrings(newValueSplitted)
    }

    const focusInputByIndex = (inputIndex: number) => {
      valueSplitted[inputIndex]?.inputRef.current?.focus()
    }

    const selectInputByIndex = (inputIndex: number) => {
      valueSplitted[inputIndex]?.inputRef.current?.select()
    }

    const manageCaretForNextInput = (currentInputIndex: number) => {
      if (currentInputIndex + 1 === length) {
        return
      }
      if (valueSplitted[currentInputIndex + 1].character) {
        selectInputByIndex(currentInputIndex + 1)
      } else {
        focusInputByIndex(currentInputIndex + 1)
      }
    }

    const manageCaretForPreviousInput = (currentInputIndex: number) => {
      if (currentInputIndex > 0) {
        selectInputByIndex(currentInputIndex - 1)
      }
    }

    const handleOneInputChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const character = event.target.value[0] || ''
      const currentInputIndex = getIndexByInputElement(event.target)

      if (
        typeof validateChar === 'function' &&
        !validateChar(character, currentInputIndex)
      ) {
        return
      }

      const newValue = replaceCharOfValue(currentInputIndex, character)

      onChange?.(newValue)

      if (newValue.length === length) {
        onComplete?.(newValue)
      }

      if (character !== '') {
        if (newValue.length < (length as number)) {
          manageCaretForNextInput(newValue.length - 1)
        } else {
          manageCaretForNextInput(currentInputIndex)
        }
      } else if (newValue[currentInputIndex]) {
        selectInputByIndex(currentInputIndex)
      } else {
        manageCaretForPreviousInput(currentInputIndex)
      }
    }

    const handleOneInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      event.preventDefault()
      event.target.select()
      onFocus?.(event)
    }

    const handleOneInputKeyDown = (
      event: React.KeyboardEvent<HTMLInputElement>
    ) => {
      const inputElement = event.target as HTMLInputElement
      const currentInputIndex = getIndexByInputElement(inputElement)
      if (inputElement.value === event.key) {
        event.preventDefault()
        manageCaretForNextInput(currentInputIndex)
      } else if (!inputElement.value && KEYBOARD_KEY.backspace === event.key) {
        event.preventDefault()
        selectInputByIndex(currentInputIndex - 1)
      } else if (KEYBOARD_KEY.left === event.key) {
        event.preventDefault()
        selectInputByIndex(currentInputIndex - 1)
      } else if (KEYBOARD_KEY.right === event.key) {
        event.preventDefault()
        selectInputByIndex(currentInputIndex + 1)
      }
      onKeyDown?.(event)
    }

    const handleOneInputPaste = (
      event: React.ClipboardEvent<HTMLInputElement>
    ) => {
      event.preventDefault()
      const inputElement = event.target as HTMLInputElement
      const content = event.clipboardData.getData('text/plain')
      const currentInputIndex = getIndexByInputElement(inputElement)
      const currentCharacter = getCharactersSplitted()
      const characters = mergeArrayStringFromIndex(
        currentCharacter,
        split(content),
        currentInputIndex
      )
      const characterIndexEmpty = characters.findIndex((character, index) => {
        return index > currentInputIndex && character === ''
      })

      const newValue = joinArrayStrings(characters)
      onChange?.(newValue)
      if (newValue.length === length) {
        onComplete?.(newValue)
        focusInputByIndex(length - 1)
        return
      }

      if (characterIndexEmpty !== -1) {
        focusInputByIndex(characterIndexEmpty)
      }
      onPaste?.(event)
    }

    return (
      <Box
        display="flex"
        gap="20px"
        alignItems="center"
        ref={propRef}
        className={`MuiOtpInput-Box ${className || ''}`}
        {...restBoxProps}
      >
        {valueSplitted.map(({ character, inputRef }, index) => {
          return (
            <TextFieldBox
              autoComplete="one-time-code"
              value={character}
              inputRef={inputRef}
              className={`MuiOtpInput-TextField MuiOtpInput-TextField-${
                index + 1
              } ${TextFieldClassName || ''}`}
              onPaste={handleOneInputPaste}
              onFocus={handleOneInputFocus}
              onChange={handleOneInputChange}
              onKeyDown={handleOneInputKeyDown}
              // We use index as the order can't be moved
              // We can't use the value as it can be duplicated
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              {...restTextFieldsProps}
            />
          )
        })}
      </Box>
    )
  }
)

MuiOtpInput.defaultProps = {
  value: '',
  length: 4,
  validateChar: () => {
    return true
  },
  onChange: () => {},
  onComplete: () => {},
  TextFieldsProps: {}
} as Required<BaseMuiOtpInputProps>

export { MuiOtpInput }
