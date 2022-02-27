import React from "../../../_snowpack/pkg/react.js";
import styled from "../../../_snowpack/pkg/styled-components.js";
export const IconWrapper = styled.div`
  margin-top: 3px;
  cursor: pointer;
  padding-right: 5px;
`;
import {Container} from "../styled/index.js";
import {Back} from "./Back.js";
export const TitleHeader = ({children}) => {
  return /* @__PURE__ */ React.createElement(Container, null, /* @__PURE__ */ React.createElement(IconWrapper, null, /* @__PURE__ */ React.createElement(Back, null)), children);
};
