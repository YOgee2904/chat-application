import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import React from "react";
import { Resolver, useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { customThemeTextField } from "@/theme/TextField";
import Link from "next/link";
interface RegisterForm {
  username: string;
  email: string;
  password: string;
  rePassword: string;
}
function validateForm(values: RegisterForm) {
  const errors: any = {
    username: { message: "" },
    email: { message: "" },
    password: { message: "" },
    rePassword: { message: "" },
  };
  if (!values.username) {
    errors.username.message = "username is required";
  }
  if (!values.email) {
    errors.email.message = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email.message = "Invalid email address";
  }
  if (!values.password) {
    errors.password.message = "password is required";
  } else if (values.password.length < 6) {
    errors.password.message = "password must be at least 6 characters";
  }
  if (!values.rePassword) {
    errors.rePassword.message = "re enter the password";
  } else if (values.rePassword !== values.password) {
    errors.rePassword.message = "password does not match";
  }
  return errors;
}

const resolver: Resolver<RegisterForm> = (values) => {
  return {
    values:
      values.username && values.email && values.rePassword && values.password
        ? values
        : {},
    errors: validateForm(values),
  };
};

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({ resolver });
  const outerTheme = useTheme();
  const [showPassword, setShowPassword] = React.useState(false);
  function handleClickShowPassword() {
    setShowPassword(!showPassword);
  }
  function formSubmitAction(data: any) {
    console.log(data);
  }
  return (
    <div className="w-screen h-screen xl:grid grid-cols-2 bg-zinc-900 text-[#ccc] overflow-scroll flex flex-col gap-10 items-center justify-center">
      <div className=" col-span-1 flex flex-col items-center justify-center gap-4  transition-opacity  animation-custom-fade-in">
        <div className="flex gap-1">
          <h1 className=" text-5xl font-semibold hover:text-white">Welcome,</h1>
          <h1 className=" text-5xl font-semibold hover:text-white">Chatters</h1>
        </div>
        <p className="text-2xl hover:text-white">
          Join the Web Chat and start chatting with your friends
        </p>
      </div>
      <div className="col-span-1 flex flex-col justify-center items-center lg:px-0 px-4 w-full">
        <h1 className="text-4xl font-semibold mb-10">Sign Up</h1>
        <ThemeProvider theme={customThemeTextField(outerTheme)}>
          <Box
            onSubmit={handleSubmit(formSubmitAction)}
            component="form"
            className="flex flex-col sm:w-1/2 w-full gap-2 "
            sx={{
              "& .MuiTextField-root": {
                m: 0.7,
              },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              {...register("username")}
              type="text"
              variant="outlined"
              label="Username"
              helperText={errors.username?.message}
            />

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
                      sx={{ color: "#ccc" }}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              {...register("rePassword")}
              type="password"
              label="Re-enter Password"
              helperText={errors.rePassword?.message}
            />
            <button className="h-[45px] bg-[#ccc] text-[#252525] mt-3 p-3 font-semibold hover:scale-[1.01] transition-all duration-300 ease-in-out outline-none focus:border-[.1px] focus:border-[#ccc]">
              Start Chatting
            </button>
            <div className="flex justify-between items-center text-sm mt-1">
              <p>Already have an account?</p>
              <Link href="/sign-in" className="text-blue-500 underline">
                <p>Sign in</p>
              </Link>
            </div>
          </Box>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default Register;
