import React from "react";
import styled from "styled-components";

const ErrorNotification: React.FC = () => {
  return <ErrorContainer>Error: Invalid input</ErrorContainer>;
};

export default ErrorNotification;

const ErrorContainer = styled.div`
  background-color: rgb(200, 50, 50);
  position: absolute;
  border: 0.5px solid grey;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 5px;
  top: 5rem;
`;
