import type { BoxProps as MuiBoxProps } from '@mui/material/Box'
import type { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField'

type TextFieldProps = Omit<
  MuiTextFieldProps,
  | 'onChange'
  | 'select'
  | 'multiline'
  | 'defaultValue'
  | 'value'
  | 'autoFocus'
  | 'placeholder'
  | 'aria-label'
  | 'aria-labelledby'
  | 'aria-describedby'
>

type IndexedMuiProps<T> = T | ((index: number) => T)

type BoxProps = Omit<MuiBoxProps, 'onChange' | 'onBlur'>

export interface BaseMuiOtpInputProps {
  value?: string
  length?: number
  autoFocus?: boolean
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
  'aria-description'?: string
  TextFieldsProps?: TextFieldProps & {
    placeholder?: IndexedMuiProps<MuiTextFieldProps['placeholder']>
    'aria-label'?: IndexedMuiProps<MuiTextFieldProps['aria-label']>
    'aria-labelledby'?: IndexedMuiProps<MuiTextFieldProps['aria-labelledby']>
    'aria-describedby'?: IndexedMuiProps<MuiTextFieldProps['aria-describedby']>
  }
  onComplete?: (value: string) => void
  validateChar?: (character: string, index: number) => boolean
  onChange?: (value: string) => void
  onBlur?: (value: string, isCompleted: boolean) => void
}

export type MuiOtpInputProps = BoxProps & BaseMuiOtpInputProps
