import React from "react";
import { atom, useRecoilState } from "recoil";
import styled from "styled-components";

import { Loading } from "../../common";
import { Line } from "../../graphs/line";
import { useData } from "../../hooks/useData";
import { userSession } from "../../modules/session";

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

export const UserSessions: React.FC = () => {
  const data = useData({ user: "adam" });
  const [selectedSession, setSession] = useRecoilState(userSession);

  console.log(data);

  const handleClick = (value: number) => () => {
    setSession(value);
  };

  if (!data) {
    return <Loading />;
  }

  return (
    <SessionWrapper>
      <Title>Sessions</Title>
      {data.map((session, index) => {
        const SessionWrapper =
          selectedSession === index ? SessionSelected : SessionItem;
        return (
          <SessionWrapper onClick={handleClick(index)} key={`session-${index}`}>
            {index}
          </SessionWrapper>
        );
      })}
    </SessionWrapper>
  );
};
