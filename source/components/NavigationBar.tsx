import React from "react";
import styled from "styled-components";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";

import { Link } from "react-router-dom";

const NavigationBar: React.FC = (): JSX.Element => {
  return (
    <StyledNavBarRoot>
      <StyledNavigationList>
        <StyledListItem>
          <StyledLink to="/newsfeed">News Feed</StyledLink>
        </StyledListItem>
        <StyledListItem>
          <StyledLink to="/dashboard">Dashboard</StyledLink>
        </StyledListItem>
      </StyledNavigationList>
    </StyledNavBarRoot>
  );
};

export default NavigationBar;

const StyledListItem = styled(NavigationMenu.Item)`
  list-style-type: none;
  width: fit-content;
  padding: 0.5rem;
  margin: 0px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: rgb(255, 255, 255);
`;

const StyledNavBarRoot = styled(NavigationMenu.Root)`
  border: 0.5px solid rgba(100, 100, 100, 0.8);
  background-color: rgb(30, 30, 30);
  padding: 1rem;
  position: fixed;
  bottom: -0.1rem;
  width: 110vw;
  left: calc(48% - 55vw);
  z-index: 1;
`;

const StyledNavigationList = styled(NavigationMenu.List)`
  display: flex;
  justify-content: space-evenly;
  padding: 0px;
  margin: 0rem;
  width: 100%;
`;
