---
sidebar_position: 1
---

# Getting Started

## Install
```bash
npm install mui-one-time-password-input --save
```
or you can use **yarn**
```bash
yarn add mui-one-time-password-input
```

We have completed installing the package.

## Simple usage

Here is a simple usage for using the component:

```jsx
import React from 'react'
import { MuiOtpInput } from 'mui-one-time-password-input'

const MyComponent = () => {
  const [otp, setOtp] = React.useState('')

  const handleChange = (newValue) => {
    setOtp(newValue)
  }

  return (
    <MuiOtpInput value={otp} onChange={handleChange} />
  )
}
```

## Congratulations !

That's all, now let's deep dive into the [props](/docs/api-reference).