import { styled } from '@mui/material/styles'
import type { TextFieldProps } from '@mui/material/TextField'
import TextField from '@mui/material/TextField'

export const TextFieldStyled: React.ComponentType<TextFieldProps> = styled(
  TextField
)`
  input {
    text-align: center;
  }
`
