import React from 'react'
import TextFieldBox from '@components/TextFieldBox/TextFieldBox'
import Box from '@mui/material/Box'
import { KEYBOARD_KEY } from '@shared/constants/event'
import {
  getFilledArray,
  joinArrayStrings,
  mergeArrayStringFromIndex,
  updateIndex
} from '@shared/helpers/array'
import { split } from '@shared/helpers/string'
import { useEvent } from '@shared/hooks/useEvent'
import type { MuiOtpInputProps } from './index.types'

export type { MuiOtpInputProps }

type ValueSplitted = {
  character: string
  inputRef: React.RefObject<HTMLInputElement>
}[]

const defaultValidateChar = () => {
  return true
}

const MuiOtpInput = React.forwardRef(
  (props: MuiOtpInputProps, propRef: MuiOtpInputProps['ref']) => {
    const {
      value = '',
      length = 4,
      autoFocus = false,
      onChange,
      TextFieldsProps,
      onComplete,
      validateChar = defaultValidateChar,
      className,
      ...restBoxProps
    } = props
    const initialValue = React.useRef(value)
    const onCallbackEvent = useEvent(onComplete)

    const matchIsCompletedEvent = useEvent((filledStrings: string) => {
      return {
        isCompleted: filledStrings.length >= length,
        finalValue: filledStrings.slice(0, length)
      }
    })

    const {
      onPaste,
      onFocus,
      onKeyDown,
      className: TextFieldClassName,
      placeholder,
      ...restTextFieldsProps
    } = TextFieldsProps || {}

    React.useEffect(() => {
      const { isCompleted, finalValue } = matchIsCompletedEvent(
        initialValue.current
      )

      if (isCompleted) {
        onCallbackEvent(finalValue)
      }
    }, [length, onCallbackEvent, matchIsCompletedEvent])

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

    const matchIsCharIsValid = (character: string, index: number) => {
      return typeof validateChar !== 'function'
        ? true
        : validateChar(character, index)
    }

    const handleOneInputChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const initialChar = event.target.value[0] || ''
      let character = initialChar
      const currentInputIndex = getIndexByInputElement(event.target)

      // handle backspace so check character
      if (character && !matchIsCharIsValid(character, currentInputIndex)) {
        character = ''
      }

      const newValue = replaceCharOfValue(currentInputIndex, character)

      onChange?.(newValue)

      const { isCompleted, finalValue } = matchIsCompletedEvent(newValue)

      if (isCompleted) {
        onComplete?.(finalValue)
      }

      // Char is valid so go to next input
      if (character !== '') {
        manageCaretForNextInput(currentInputIndex)
        // Only for backspace so don't go to previous input if the char is invalid
      } else if (initialChar === '') {
        selectInputByIndex(currentInputIndex - 1)
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
      } else if (KEYBOARD_KEY.home === event.key) {
        event.preventDefault()
        selectInputByIndex(0)
      } else if (KEYBOARD_KEY.end === event.key) {
        event.preventDefault()
        selectInputByIndex(valueSplitted.length - 1)
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
      ).map((character, index) => {
        return matchIsCharIsValid(character, index) ? character : ''
      })

      const characterIndexEmpty = characters.findIndex((character) => {
        return character === ''
      })

      const newValue = joinArrayStrings(characters)
      onChange?.(newValue)

      const { isCompleted, finalValue } = matchIsCompletedEvent(newValue)

      if (isCompleted) {
        onComplete?.(finalValue)
        focusInputByIndex(length - 1)
      } else if (characterIndexEmpty !== -1) {
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
              autoFocus={autoFocus ? index === 0 : false}
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
              placeholder={
                typeof placeholder === 'function'
                  ? placeholder(index)
                  : placeholder
              }
              {...restTextFieldsProps}
            />
          )
        })}
      </Box>
    )
  }
)

export { MuiOtpInput }
