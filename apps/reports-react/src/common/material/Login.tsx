import * as React from "react";
import styled from "styled-components";
import { Input } from "./Input";
import { Button } from "./Button";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
`;
const InputWrapper = styled(Input)`
  margin: 10px;
  max-width: 50vh;
`;
const ButtonWrapper = styled(Button)`
  margin: 20px;
  margin-left: 10px;
  max-width: 50vh;
`;

export interface LoginProps {
  setCredentials: (props: { email: string; password: string }) => unknown;
}
export const Login: React.FC<LoginProps> = ({ setCredentials }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = () => {
    setCredentials({ email, password });
  };
  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <form className="form">
      <Wrapper>
        <InputWrapper id="email" onChange={handleChangeEmail} />
        <InputWrapper
          id="password"
          onChange={handleChangePassword}
          type="password"
        />

        <ButtonWrapper onClick={handleLogin}>Log in</ButtonWrapper>
      </Wrapper>
    </form>
  );
};
