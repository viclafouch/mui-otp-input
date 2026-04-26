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
import { mergeRefs } from '@shared/helpers/react'
import { split } from '@shared/helpers/string'
import { useEvent } from '@shared/hooks/useEvent'
import type { MuiOtpInputProps } from './index.types'

export type { MuiOtpInputProps }

const defaultValidateChar = () => {
  return true
}

const BASE_BOX_SX = {
  display: 'flex',
  gap: '20px',
  alignItems: 'center'
} as const

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
      onBlur,
      sx,
      ...restBoxProps
    } = props
    const initialValue = React.useRef(value)
    const onCallbackEvent = useEvent(onComplete)

    const matchIsCompletedEvent = useEvent((filledStrings: string) => {
      const finalValue = filledStrings.slice(0, length)

      return {
        isCompleted: finalValue.length === length,
        finalValue
      }
    })

    React.useEffect(() => {
      const { isCompleted, finalValue } = matchIsCompletedEvent(
        initialValue.current
      )

      if (isCompleted) {
        onCallbackEvent(finalValue)
      }
    }, [length, onCallbackEvent, matchIsCompletedEvent])

    const valueSplitted = getFilledArray(length as number, (_, index) => {
      return {
        character: (value as string)[index] || '',
        inputRef: React.createRef<HTMLInputElement>()
      }
    })

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
      const currentInputIndex = getIndexByInputElement(event.target)

      if (currentInputIndex === 0 && event.target.value.length > 1) {
        const { finalValue, isCompleted } = matchIsCompletedEvent(
          event.target.value
        )
        onChange?.(finalValue)

        if (isCompleted) {
          onComplete?.(finalValue)
        }

        selectInputByIndex(finalValue.length - 1)

        return
      }

      const initialChar = event.target.value[0] || ''
      let character = initialChar

      if (character && !matchIsCharIsValid(character, currentInputIndex)) {
        character = ''
      }

      const newValue = replaceCharOfValue(currentInputIndex, character)

      onChange?.(newValue)

      const { isCompleted, finalValue } = matchIsCompletedEvent(newValue)

      if (isCompleted) {
        onComplete?.(finalValue)
      }

      if (character !== '') {
        if (newValue.length - 1 < currentInputIndex) {
          selectInputByIndex(newValue.length)
        } else {
          manageCaretForNextInput(currentInputIndex)
        }
      } else if (initialChar === '' && newValue.length <= currentInputIndex) {
        selectInputByIndex(currentInputIndex - 1)
      }
    }

    const handleOneInputKeyDown = (
      event: React.KeyboardEvent<HTMLDivElement>
    ) => {
      const inputElement = event.target as HTMLInputElement
      const startPos = inputElement.selectionStart
      const endPos = inputElement.selectionEnd
      const currentInputIndex = getIndexByInputElement(inputElement)
      const isCaretBeforeChar = startPos === 0 && endPos === 0

      if (inputElement.value === event.key) {
        event.preventDefault()
        manageCaretForNextInput(currentInputIndex)
      } else if (KEYBOARD_KEY.backspace === event.key) {
        if (!inputElement.value) {
          event.preventDefault()

          selectInputByIndex(currentInputIndex - 1)
        } else if (isCaretBeforeChar) {
          event.preventDefault()

          const newValue = replaceCharOfValue(currentInputIndex, '')
          onChange?.(newValue)

          if (newValue.length <= currentInputIndex) {
            selectInputByIndex(currentInputIndex - 1)
          }
        }
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
    }

    const handleOneInputPaste = (
      event: React.ClipboardEvent<HTMLDivElement>
    ) => {
      const content = event.clipboardData.getData('text/plain')
      const inputElement = event.target as HTMLInputElement
      const currentInputIndex = valueSplitted.findIndex(
        ({ character, inputRef }) => {
          return character === '' || inputRef.current === inputElement
        }
      )
      const currentCharacter = getCharactersSplitted()

      const characters = mergeArrayStringFromIndex(
        currentCharacter,
        split(content),
        currentInputIndex
      ).map((character, index) => {
        return matchIsCharIsValid(character, index) ? character : ''
      })

      const newValue = joinArrayStrings(characters)
      onChange?.(newValue)

      const { isCompleted, finalValue } = matchIsCompletedEvent(newValue)

      if (isCompleted) {
        onComplete?.(finalValue)
        selectInputByIndex(length - 1)
      } else {
        selectInputByIndex(newValue.length)
      }
    }

    const handleBlur = (
      event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
    ) => {
      const anInputIsFocused = valueSplitted.some(({ inputRef }) => {
        return inputRef.current === event.relatedTarget
      })

      if (!anInputIsFocused) {
        const { isCompleted, finalValue } = matchIsCompletedEvent(value)
        onBlur?.(finalValue, isCompleted)
      }
    }

    const sxItems = sx ? [sx].flat() : []

    return (
      <Box
        sx={[BASE_BOX_SX, ...sxItems]}
        ref={propRef}
        className={`MuiOtpInput-Box ${className || ''}`}
        {...restBoxProps}
      >
        {valueSplitted.map(({ character, inputRef }, index) => {
          const {
            onPaste,
            onFocus,
            onKeyDown,
            className: TextFieldClassName,
            onBlur: TextFieldOnBlur,
            inputRef: TextFieldInputRef,
            ...restTextFieldsProps
          } = typeof TextFieldsProps === 'function'
            ? TextFieldsProps(index) || {}
            : TextFieldsProps || {}

          return (
            <TextFieldBox
              // eslint-disable-next-line jsx-a11y/no-autofocus -- OTP input requires autoFocus on first field for usability
              autoFocus={autoFocus ? index === 0 : false}
              autoComplete="one-time-code"
              value={character}
              inputRef={mergeRefs([inputRef, TextFieldInputRef])}
              className={`MuiOtpInput-TextField MuiOtpInput-TextField-${
                index + 1
              } ${TextFieldClassName || ''}`}
              onPaste={(event) => {
                event.preventDefault()
                handleOneInputPaste(event)
                onPaste?.(event)
              }}
              onFocus={(event) => {
                event.preventDefault()
                event.target.select()
                onFocus?.(event)
              }}
              onChange={handleOneInputChange}
              onKeyDown={(event) => {
                handleOneInputKeyDown(event)
                onKeyDown?.(event)
              }}
              onBlur={(event) => {
                TextFieldOnBlur?.(event)
                handleBlur(event)
              }}
              key={index}
              {...restTextFieldsProps}
            />
          )
        })}
      </Box>
    )
  }
)

export { MuiOtpInput }
