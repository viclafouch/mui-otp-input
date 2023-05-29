import React from 'react'
import type { TextFieldProps } from '@mui/material/TextField'
import Styled from './TextFieldBox.styled'

const TextFieldBox = (props: TextFieldProps) => {
  return <Styled.TextFieldStyled {...props} />
}

export default TextFieldBox
