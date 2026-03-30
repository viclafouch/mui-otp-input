import React from 'react'
import type { TextFieldProps } from '@mui/material/TextField'
import { TextFieldStyled } from './TextFieldBox.styled'

const TextFieldBox = (props: TextFieldProps) => {
  return <TextFieldStyled {...props} />
}

export default TextFieldBox
