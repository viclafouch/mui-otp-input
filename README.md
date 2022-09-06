<div align="center">
<h1>MUI OTP input</h1>
  <p>An OTP input designed for the React library <a href="https://mui.com/">MUI</a></p>
</div>
<div align="center">

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/viclafouch/mui-otp-input/blob/main/LICENSE)
![ts](https://badgen.net/badge/Built%20With/TypeScript/blue)
[![npm](https://img.shields.io/npm/v/mui-one-time-password-input)](https://www.npmjs.com/package/mui-one-time-password-input)

<div align="center">
  <img src="https://github.com/viclafouch/mui-otp-input/blob/main/mui-otp-input.gif" width="100%" />
</div>


</div>

## Installation

```
// with npm
npm install mui-one-time-password-input

// with yarn
yarn add mui-one-time-password-input
```

## Usage

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

## [Documentation](https://viclafouch.github.io/mui-otp-input/)

## Changelog

Go to [Github Releases](https://github.com/viclafouch/mui-otp-input/releases)

## TypeScript

This library comes with TypeScript "typings". If you happen to find any bugs in those, create an issue.

### 🐛 Bugs

Please file an issue for bugs, missing documentation, or unexpected behavior.

### 💡 Feature Requests

Please file an issue to suggest new features. Vote on feature requests by adding
a 👍. This helps maintainers prioritize what to work on.

## LICENSE

MIT
