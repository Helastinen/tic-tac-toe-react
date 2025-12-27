import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/styles.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Game from "./Game";
import Container from "@mui/material/Container";
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";

const rootElement = document.getElementById("root");

let theme = createTheme();
theme = responsiveFontSizes(theme);


if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <ThemeProvider theme={theme}>
        <Container
          maxWidth={false}
          sx={{
            width: { xs: "100%", lg: "60%" },
            maxWidth: "1200px"
          }}
        >
          <Game />
        </Container>
      </ThemeProvider>
    </StrictMode>
  );
} else {
  throw new Error("Root element not found");
}