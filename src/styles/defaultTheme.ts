import { createTheme } from "@mui/material";
import { styleColor } from "./styleColor";

export const theme = createTheme({
  palette: {
    primary: {
      main: `${styleColor.BLUE.PRIMARY}`,
      dark : `${styleColor.BLUE[100]}`
    },
    secondary: {
      main: `${styleColor.YELLOW.PRIMARY}`,
      dark: `${styleColor.YELLOW[0]}`
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
        size: "medium",
        color: "primary",
      },
      styleOverrides: {
        root: {
          padding: "5px 30px",
          color: `${styleColor.WHITE}`,
        },
      },
    },
  },
});
