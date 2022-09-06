import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { MuiOtpInput } from './index'

export default {
  title: 'MuiOtpInput',
  component: MuiOtpInput
} as ComponentMeta<typeof MuiOtpInput>

const theme = createTheme()

export const Primary: ComponentStory<typeof MuiOtpInput> = () => {
  const [value, setValue] = React.useState<string>('')

  const handleChange = (newValue: string) => {
    setValue(newValue)
  }

  return (
    <ThemeProvider theme={theme}>
      <MuiOtpInput
        length={5}
        sx={{ width: 300 }}
        gap={1}
        TextFieldsProps={{ type: 'text', size: 'medium', placeholder: '-' }}
        value={value}
        onChange={handleChange}
      />
    </ThemeProvider>
  )
}
