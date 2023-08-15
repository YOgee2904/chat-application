import { customThemeTextField } from "@/theme/TextField";
import { TextField, ThemeProvider, useTheme } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, IconButton, InputAdornment } from "@mui/material";
import React from "react";
import Link from "next/link";
import { Resolver, useForm } from "react-hook-form";

type LoginForm = {
  email: string;
  password: string;
};

function validateLoginForm(value: LoginForm) {
  const errors: any = { email: { message: "" }, password: { message: "" } };
  if (!value.email) {
    errors.email.message = "Email is required";
  }
  if (!value.password) {
    errors.password.message = "Password is required";
  }
  return errors;
}
const resolver: Resolver<LoginForm> = (formValue) => {
  return {
    values: formValue.email && formValue.password ? formValue : {},
    errors: validateLoginForm(formValue),
  };
};
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver });

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const outerTheme = useTheme();

  return (
    <div className="w-screen h-screen xl:grid grid-cols-2 bg-zinc-900 text-[#ccc] overflow-scroll flex flex-col-reverse items-center justify-center">
      <div className="col-span-1 flex flex-col justify-center items-center lg:px-0 px-4 w-full">
        <h1 className="text-4xl font-semibold mb-10">Sign in</h1>
        <ThemeProvider theme={customThemeTextField(outerTheme)}>
          <Box
            onSubmit={handleSubmit((form) => console.log(form))}
            className="flex flex-col sm:w-1/2 w-full gap-2"
            component={"form"}
            noValidate
            autoComplete="off"
            sx={{
              "& .MuiTextField-root": {
                m: 0.7,
              },
            }}
          >
            <TextField
              {...register("email")}
              type="email"
              label="Email"
              variant="outlined"
              helperText={errors.email?.message}
            />
            <TextField
              {...register("password")}
              type={showPassword ? "text" : "password"}
              label="Password"
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                      sx={{ color: "#a0a0a0" }}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff/>}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <button className="h-[45px] bg-[#ccc] text-[#252525] mt-3 p-3 font-semibold hover:scale-[1.01] transition-all duration-300 ease-in-out outline-none focus:border-[.1px] focus:border-[#ccc]">
              Start Chatting
            </button>
            <div className="flex justify-between items-center text-sm mt-1">
              <p>Forgot your password?</p>
              <Link href="/sign-up" className="text-blue-500 underline">
                <p>Sign up</p>
              </Link>
            </div>
          </Box>
        </ThemeProvider>
      </div>
      <div className="col-span-1 flex flex-col items-center justify-center gap-4  transition-opacity  animation-custom-fade-in">
        <div className="flex gap-1">
          <h1 className=" text-5xl font-semibold hover:text-white">Welcome,</h1>
          <h1 className=" text-5xl font-semibold hover:text-white">Chatters</h1>
        </div>
        <p className="text-2xl hover:text-white">
          Join the Web Chat and start chatting with your friends
        </p>
      </div>
    </div>
  );
}

export default Login;
