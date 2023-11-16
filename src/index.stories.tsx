import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material'
import { action } from '@storybook/addon-actions'
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

  const handleComplete = (finalValue: string) => {
    action('onCompete')(finalValue)
  }

  return (
    <ThemeProvider theme={theme}>
      <MuiOtpInput
        length={5}
        autoFocus
        sx={{ width: 300 }}
        gap={1}
        onComplete={handleComplete}
        TextFieldsProps={{
          type: 'text',
          size: 'medium',
          placeholder: (index) => {
            return `${index}`
          },
          'aria-label': (index) => {
            return `${index}`
          },
          'aria-labelledby': (index) => {
            return `label-id-${index}`
          },
          'aria-describedby': (index) => {
            return `description-id-${index}`
          }
        }}
        value={value}
        onChange={handleChange}
      />
    </ThemeProvider>
  )
}
