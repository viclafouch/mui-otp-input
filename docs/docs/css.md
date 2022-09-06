---
sidebar_position: 5
---

# CSS

Like any component, if you want to override a component's styles using custom classes, you can use the `className` prop.

```jsx
<MuiOtpInput className="my-class-name" />
```

Then, you can use the differents global class names (see below) to target an element of `MuiOtpInput`.

| 	Global class                            | Description                                                                                                                   |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `.MuiOtpInput-Box`                        | 	Styles applied to the root element.                                                                                                                   |
| `.MuiOtpInput-TextField`                        | 	Styles applied to each [TextField](https://mui.com/material-ui/api/text-field/) component.                                                                                                                   |
| `.MuiOtpInput-TextField-{n}`                        | 	Styles applied to a specific [TextField](https://mui.com/material-ui/api/text-field/) component. ``.MuiOtpInput-TextField-3` to target the third TextField for example.                                                                                                                    |
For example: target the `.MuiTelInput-TextField` global class name to customize all TextFields.

## Example with styled-component / emotion

```jsx
import { styled } from 'styled-component' // or emotion
import { MuiOtpInput } from 'mui-one-time-password-input'

const MuiOtpInputStyled = styled(MuiOtpInput)`
  display: flex;
  gap: 30px;
  max-width: 650px;
  margin-inline: auto;
`

function MyComponent() {
  return <MuiOtpInputStyled />
}
```