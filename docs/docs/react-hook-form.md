# React Hook Form

Here an example if you want to plug `MuiOtpInput` to your form using [React Hook Form](https://react-hook-form.com/).

```tsx
import React from "react";
import ReactDOM from "react-dom";
import Button from "@mui/material/Button";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Controller, useForm } from "react-hook-form";

const App = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      otp: ""
    }
  });

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="otp"
        control={control}
        rules={{ validate: (value) => value.length === 6 }}
        render={({ field, fieldState }) => (
          <Box>
            <MuiOtpInput sx={{ gap: 1 }} {...field} length={6} />
            {fieldState.invalid ? (
              <FormHelperText error>OTP invalid</FormHelperText>
            ) : null}
          </Box>
        )}
      />
     <div>
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Submit
        </Button>
      </div>
    </form>
  )
}
```
[![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-hook-form-with-mui-one-time-password-input-651h4g?theme=dark)