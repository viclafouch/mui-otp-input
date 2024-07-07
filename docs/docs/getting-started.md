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

## Next.js integration

Learn how to use MUI OTP Input with [Next.js](https://nextjs.org/).

Once you have installed `MUI OTP Input` in your next.js project, it is important to transpile it as it is an ESM package first.

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
 transpilePackages: ['mui-one-time-password-input'],
 // your config
}

module.exports = nextConfig
```
## Congratulations !

That's all, now let's deep dive into the [props](/docs/api-reference).