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
or you can use **pnpm**
```bash
pnpm add mui-one-time-password-input
```

## Peer Dependencies

MUI OTP Input requires the following peer dependencies:

- `@emotion/react` >= 11.13.0
- `@emotion/styled` >= 11.13.0
- `@mui/material` >= 7.0.0
- `react` >= 18.0.0
- `react-dom` >= 18.0.0

These are typically already installed if you're using Material UI in your project.

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

Once you have installed `MUI OTP Input` in your Next.js project, it is important to transpile it as it is an ESM package first.

```js
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['mui-one-time-password-input'],
  // your config
}

export default nextConfig
```

## Congratulations!

That's all, now let's deep dive into the [props](/docs/api-reference).
