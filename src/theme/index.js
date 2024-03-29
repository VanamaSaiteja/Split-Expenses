import React from "react";
import { CssBaseline } from "@mui/material";
import {
    createTheme,
    ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import Palettes from "./palettes";
import Breakpoints from "./breakpoints";
import Overrides from "./overrides";
import { useAppContext } from "../App-context";

export default function ThemeProvider({ children }) {
    const { mode } = useAppContext();

    const palette =
        mode === "dark"
            ? { mode: "dark" }
            : {
                  ...Palettes.light,
                  background: { default: "#ebebeb" },
              };

    const theme = createTheme({
        breakpoints: Breakpoints,
        palette,
    });

    theme.components = Overrides(theme);

    return (
        <MUIThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </MUIThemeProvider>
    );
}
