import * as React from "react"
import styled from "styled-components"

import { Button } from "./Button"
import { Input } from "./Input"

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
`
const ErrorWrapper = styled.div`
  margin: 10px;
  max-width: 50vh;
  color: red;
`
const InputWrapper = styled(Input)`
  margin: 10px;
  max-width: 50vh;
`
const ButtonWrapper = styled(Button)`
  margin: 20px;
  margin-top: 10px;
  margin-left: 10px;
  max-width: 50vh;
`

export interface LoginProps {
  error?: string;
  setCredentials: (props: { email: string; password: string }) => unknown;
}
export const Login: React.FC<LoginProps> = ({ setCredentials, error }) => {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const handleLogin = () => {
    // console.log("Setting:", { email, password });
    setCredentials({ email, password })
  }
  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  return (
    <form className="form">
      <ErrorWrapper>{error}</ErrorWrapper>
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
  )
}
