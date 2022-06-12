import * as React from "react";
import styled from "styled-components";

import { Button } from "./Button";
import { Input } from "./Input";

const Page = styled.div`
  display: flex;
  justify-content: center;
  form {
    border: 1px solid #aaa;
    margin: 40px;
    padding: 40px;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  div {
    margin-bottom: 5px;
  }
`;
const ErrorWrapper = styled.div`
  margin: 10px;
  color: red;
`;
const InputWrapper = styled(Input)`
  margin: 10px;
`;
const ButtonWrapper = styled.div`
  margin: 30px;
`;

export interface LoginProps {
  error?: string;
  setCredentials: (props: { email: string; password: string }) => unknown;
}
export const Login: React.FC<LoginProps> = ({ setCredentials, error }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = () => {
    // console.log("Setting:", { email, password });
    setCredentials({ email, password });
  };
  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <Page>
      <form className="form">
        <ErrorWrapper>{error}</ErrorWrapper>
        <Wrapper>
          <InputWrapper
            id="email"
            placeholder="Email"
            onChange={handleChangeEmail}
          />
          <InputWrapper
            id="password"
            placeholder="Password"
            onChange={handleChangePassword}
            type="password"
          />

          <ButtonWrapper>
            <Button onClick={handleLogin}>Log in</Button>
          </ButtonWrapper>
        </Wrapper>
      </form>
    </Page>
  );
};
