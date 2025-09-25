import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Game from "./Game";
import Container from "@mui/material/Container";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Container
      maxWidth="false"
      sx={{
        width: {xs: "100%", lg: "60%"},
        maxWidth: "1200px"
      }}
      >
      <Game />
    </Container>
  </StrictMode>
);