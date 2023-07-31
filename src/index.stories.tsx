import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material'
import { Meta, StoryFn } from '@storybook/react'
import { MuiOtpInput } from './index'

export default {
  title: 'MuiOtpInput',
  component: MuiOtpInput
} as Meta<typeof MuiOtpInput>

const theme = createTheme()

export const Primary: StoryFn<typeof MuiOtpInput> = () => {
  const [value, setValue] = React.useState<string>('123456')

  const handleChange = (newValue: string) => {
    setValue(newValue)
  }

  return (
    <ThemeProvider theme={theme}>
      <MuiOtpInput
        length={5}
        autoFocus
        sx={{ width: 300 }}
        gap={1}
        TextFieldsProps={{
          type: 'text',
          size: 'medium',
          placeholder: (index) => {
            return `${index}`
          }
        }}
        value={value}
        onChange={handleChange}
      />
    </ThemeProvider>
  )
}
