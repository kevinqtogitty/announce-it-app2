import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import styled from "styled-components";
import { Header } from "./components/feeds/MemberOfAnnouncements";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Header>AnnounceIt!</Header>
      <App />
      <NavigationBar />
    </BrowserRouter>
  </React.StrictMode>
);
