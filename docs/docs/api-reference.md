---
sidebar_position: 3
---

# API Reference

This article discusses the API and props of **MuiOtpInput**. Props are defined within `MuiOtpInputProps`.

## `value`

- Type: `string` | `undefined`
- Default: `''`

```tsx
<MuiOtpInput />
<MuiOtpInput value="A3B7" />
```

## `onChange`

- Type: `(value: string) => void`
- Default: `undefined`

Gets called once the user updates one of the inputs.

```tsx

const handleChange = (value) => {
  /**
  value: "A"
  **/
}

<MuiOtpInput onChange={handleChange} />
```

## `length`

- Type: `number`
- Default: `4`

Choose the number of inputs to display, it also represents the length of the final value.

```tsx
<MuiOtpInput length={6} />
```


## `onComplete`

- Type: `(value: string) => void`
- Default: `undefined`

Gets called once the user has filled all inputs.

```tsx

const handleComplete = (value) => {
  /**
  value: "ABCD"
  **/
}

<MuiOtpInput length={4} onComplete={handleComplete} />
```

## `onBlur`

- Type: `((value: string, isCompleted: boolean) => void) | undefined`
- Default: `undefined`


Unlike the normal type of a `TextField['onBlur']` prop, here it only triggers when no input of the component is focused.

```tsx
<MuiOtpInput onBlur={() => console.log('no input of the component is focused')} />
```


## `autoFocus`

- Type: `boolean`
- Default: `false`

Choose to auto focus the first input.

```tsx
<MuiOtpInput autoFocus />
```


## `validateChar`

- Type: `(value: string, index: number) => boolean`
- Default: `() => true`

A function that validates each character during keyPress / paste events. If a user fills in an invalid character (like a letter instead of a number), it will not be displayed.

```tsx

export function matchIsNumeric(text) {
  const isNumber = typeof text === 'number'
  const isString = matchIsString(text)
  return (isNumber || (isString && text !== '')) && !isNaN(Number(text))
}

const validateChar = (value, index) => {
  return matchIsNumeric(value)
}

<MuiOtpInput length={4} validateChar={validateChar} />
```

# TextFieldsProps

While not explicitly documented, the props of the MUI **[TextField](https://mui.com/api/text-field)** component can be used for each `TextField`.

See: https://mui.com/material-ui/api/text-field/

```jsx
<MuiOtpInput TextFieldsProps={{ disabled: true, size: 'small' }} />
```

## `placeholder`

- Type: `string` | `undefined` | `(index: number) => string | undefined`
- Default: `undefined`

Unlike the normal type of a `TextField`, here you can manage a distinct placeholder for each field.

```tsx
<MuiOtpInput TextFieldsProps={{ placeholder: '-' }} />
<MuiOtpInput TextFieldsProps={{ placeholder: (index) => `i-${index}` }} />
```
