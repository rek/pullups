import * as React from "react";
import styled from "styled-components";

import { Button } from "./Button";
import { Input } from "./Input";

const Page = styled.div`
  display: flex;
  justify-content: center;

  background: #ecf0f3;
  height: 100vh;
  margin: 0;
  padding: 0;

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus {
    border-radius: 25px;
  }

  form {
    border: 1px solid #ddd;
    margin: 40px;
    padding: 40px;
    height: 40vh;

    border-radius: 40px;
    background: #ecf0f3;
    box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #ffffff;
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
  margin: 20px;
  div::before {
    border-bottom: none;
    margin-left: 20px;
    margin-right: 20px;
  }
  div {
    margin: 20px;
    border-radius: 25px;
    box-shadow: inset 8px 8px 8px #cbced1, inset -8px -8px 8px #ffffff;
  }
  input {
    font-size: 13px;
    border: none;
    outline: none;
    background: none;
    color: #555;
    padding: 20px 10px 20px 25px;
  }
`;
const ButtonWrapper = styled.div`
  margin: 30px;
  button {
    color: #555;
    font-size: 16px;
    background: #ecf0f3;
  }
`;

export interface LoginProps {
  error?: string;
  setCredentials: (props: { email: string; password: string }) => unknown;
}
export const Login: React.FC<LoginProps> = ({ setCredentials, error }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };
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
            onKeyDown={handleKeyDown}
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
