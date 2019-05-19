import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { darkTheme } from "./themes";
import Dashboard from "./components/Dashboard";
import "./App_dark.css";

const App = () => (
  <MuiThemeProvider theme={darkTheme}>
    <Dashboard />
  </MuiThemeProvider>
);

export default App;
