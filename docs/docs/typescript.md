---
sidebar_position: 4
---

# TypeScript

This package is written in **TypeScript**. So you don't need to create your own types. Here an example if you use **TypeScript**.

**Nota bene**: Props are defined within the `MuiOtpInputProps` interface.

```tsx
import React from 'react'
import { MuiOtpInput } from 'mui-one-time-password-input'

const MyComponent = () => {
  const [value, setValue] = React.useState<string>('')

  const handleChange = (newValue: string) => {
    setValue(newValue)
  }

  const handleComplete = (finalValue: string) => {
    fetch('...')
  }

  return (
    <MuiOtpInput
      value={value}
      onChange={handleChange}
      onComplete={handleComplete}
      length={8}
      autoFocus
      validateChar={(character: string, index: number) => true}
    />
  )
}
```
