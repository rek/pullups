import React from "react";
import styled from "styled-components";

export const IconWrapper = styled.div`
  margin-top: 3px;
  cursor: pointer;
  padding-right: 5px;
`;

import { Container } from "../styled";
import { Back } from "./Back";

export const TitleHeader: React.FC = ({ children }) => {
  return (
    <Container>
      <IconWrapper>
        <Back />
      </IconWrapper>
      {children}
    </Container>
  );
};
