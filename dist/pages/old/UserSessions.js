import React from "../../../_snowpack/pkg/react.js";
import {useRecoilState} from "../../../_snowpack/pkg/recoil.js";
import styled from "../../../_snowpack/pkg/styled-components.js";
import {useData} from "../../hooks/useData.js";
import {Loading} from "../../common/index.js";
import {userSession} from "../../modules/session.js";
const Title = styled.div`
  font-weight: 800;
  padding: 10px 0;
`;
const SessionItem = styled.div`
  padding: 20px;
  border: 1px solid;
  width: calc(1vw);
  :hover {
    background-color: grey;
  }
`;
const SessionSelected = styled(SessionItem)`
  border: 1px solid red;
`;
const SessionWrapper = styled.div`
  padding: 20px;
  margin: 20px;
`;
export const UserSessions = () => {
  const data = useData({user: "adam"});
  const [selectedSession, setSession] = useRecoilState(userSession);
  console.log(data);
  const handleClick = (value) => () => {
    setSession(value);
  };
  if (!data) {
    return /* @__PURE__ */ React.createElement(Loading, null);
  }
  return /* @__PURE__ */ React.createElement(SessionWrapper, null, /* @__PURE__ */ React.createElement(Title, null, "Sessions"), data.map((session, index) => {
    const SessionWrapper2 = selectedSession === index ? SessionSelected : SessionItem;
    return /* @__PURE__ */ React.createElement(SessionWrapper2, {
      onClick: handleClick(index),
      key: `session-${index}`
    }, index);
  }));
};
