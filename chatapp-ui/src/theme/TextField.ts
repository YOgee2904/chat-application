import { Theme, createTheme, outlinedInputClasses } from "@mui/material";

export const customThemeTextField = (outerTheme: Theme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "--TextField-brandBorderColor": "#aeaeae",
            "--TextField-brandTextColor": "#fff",
            "--TextField-brandBorderHoverColor": "#fff",
            "--TextField-brandBorderFocusedColor": "#ccc",
            "& label.Mui-focused": {
              color: "var(--TextField-brandBorderFocusedColor)",
            },
            "& label": {
              color: "var(--TextField-brandBorderColor)",
            },
            "& p": {
              color: "#ff9494",
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          input: {
            color: "var(--TextField-brandTextColor)",
          },
          notchedOutline: {
            borderColor: "var(--TextField-brandBorderColor)",
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderHoverColor)",
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
    },
  });
