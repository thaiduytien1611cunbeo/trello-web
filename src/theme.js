import { cyan, deepOrange, orange, red, teal } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const APP_BAR_HEIGHT = "58px";
const BOARD_BAR_HEIGHT = "60px";
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`;
const COLUMN_HEADER_HEIGHT = "50px";
const COLUMN_FOOTER_HEIGHT = "56px";

// Create a theme instance.
const theme = createTheme({
  trello: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
    columnHeaderHeight: COLUMN_HEADER_HEIGHT,
    columnFooterHeight: COLUMN_FOOTER_HEIGHT,
  },
  colorSchemes: {
    light: {
      // palette: {
      //   primary: red,
      //   secondary: deepOrange,
      // },
    },
    dark: {
      // palette: {
      //   primary: cyan,
      //   secondary: orange,
      // },
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          // scrollbarColor: "#6b6b6b #2b2b2b",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            with: "5px",
            height: "5px",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: "8px",
            backgroundColor: "#dcdde1",
          },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
            {
              backgroundColor: "white",
            },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
            {
              backgroundColor: "#00b894",
            },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
            {
              backgroundColor: "white",
            },

          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: "#2b2b2b",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderWidth: "0.5px",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
          "& fieldset": {
            borderWidth: "0.5px !important",
          },
          "&:hover fieldset": {
            borderWidth: "1px !important",
          },
          "&:Mui-focused fieldset": {
            borderWidth: "1px !important",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          "&.MuiTypography-body1": {
            fontSize: "0.875rem",
          },
        },
      },
    },
  },
});

export default theme;
