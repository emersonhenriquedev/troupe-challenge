import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { login } from "../../store/slices/userSlice"
import { useHistory } from 'react-router-dom'
import {
  Button,
  Form,
  Container
} from "semantic-ui-react"

export default function Login() {

  const [password, setPassword] = useState(undefined)
  const [email, setEmail] = useState(undefined)
  const [isValid, setIsValid] = useState(false)

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    const validations = []
    validations.push(email && email.includes('@'))
    validations.push(password && password.length >= 4)
    setIsValid(validations.reduce((t, a) => t && a))

  }, [email, password])

  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email === 'teste@email.com.br' && password === '123456') {
      dispatch(login())
      return history.push('/')
    }

    setPassword('')
    setEmail('')
  }

  const validLoginButton = <Button type="submit" >Entrar</Button>
  const invalidLoginButton = <Button disabled type="submit">Entrar</Button>

  return (
    <div>
      <Container>
        <h1>Login</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>E-mail</label>
            <input
              onChange={handleChangeEmail}
              type="email"
              placeholder='E-mail' />
          </Form.Field>
          <Form.Field>
            <label>Senha</label>
            <input
              onChange={handleChangePassword}
              type="password"
              placeholder='Senha' />
          </Form.Field>

          {isValid ? validLoginButton : invalidLoginButton}
        </Form>
      </Container>

    </div>
  )
}
