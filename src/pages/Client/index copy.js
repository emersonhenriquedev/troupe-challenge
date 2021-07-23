import React, { useEffect, useState, useRef } from 'react'
import axios from "axios"
// import InputMask from "react-input-mask"
import {
  Container,
  Form,
  Button
} from "semantic-ui-react"

import Header from "../../components/Header"
import MaskedInput from '../../components/MaskedInput'

const initialState = {
  nome: undefined,
  cpf: undefined,
  email: undefined,
  cep: undefined,
  logradouro: undefined,
  numero: undefined,
  bairro: undefined,
  cidade: undefined
}

export default function Client() {


  const [values, setValues] = useState(initialState)
  const [hasError, setHasError] = useState(undefined)

  const itemsRef = useRef([])

  useEffect(() => {

    const handleBlur = (currentInput) => {
      console.log('input is blurred')
      if (currentInput.value === '') {
        console.log('vazio')
      }
    }

    itemsRef.current = itemsRef.current.slice(0, [...Object.keys(values)].length)
    itemsRef.current.forEach((item, index) => {
      itemsRef[index].addEventListener('blur', handleBlur(item))

    })

    return () => {
      itemsRef.current.forEach((item, index) => {
        itemsRef[index].removeEventListener('blur', handleBlur(item))

      })

    }

    // if (hasError) {
    //   refContainer.current.parentElement.classList.add('error')

    // }
  })

  const handleChange = event => {
    if (event.target.name === 'cep') {
      queryCep(event)
    }
    setValues({
      ...values,
      [event.target.name]: event.target.value

    })
  }

  const queryCep = async (event) => {
    const cep = event.target.value
    if (cep && cep.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json`)
        const cidade = response.data.localidade
        const bairro = response.data.bairro
        const logradouro = response.data.logradouro

        let withAddress = { ...values, cep, cidade, bairro, logradouro }
        setValues(withAddress)

        console.log(response)
      } catch (err) {
        console.err(err)
      }
    }
  }

  const handleSubmit = () => {
    // const hasEmpty = [...Object.values(values)].map(k => k === undefined || k === '').includes(true)
    const hasEmpty = [...Object.values(values)].findIndex(k => k === undefined || k === '')
    // console.log([...Object.values(values)].map(k => k === undefined))
    console.log(hasEmpty)


    if (hasEmpty !== -1) {
      setHasError(true)
      console.log('tem vazio')

    } else {

    }

  }

  return (
    <div>
      <Header />
      <Container>
        <h1>Cadastrar novo cliente</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>Nome</label>
            <input
              placeholder='Nome'
              name="nome"
              ref={el => itemsRef.current[0] = el}
              onChange={handleChange} />
          </Form.Field>
          <Form.Field>
            <label>E-mail</label>
            <input
              error
              name='email'
              ref={el => itemsRef.current[1] = el}
              placeholder='E-mail'

              onChange={handleChange} />
          </Form.Field>
          <Form.Field>
            <label>CPF</label>
            {/* <input placeholder='CPF' /> */}
            <MaskedInput
              mask="999.999.999-99"
              name="cpf"
              placeholder="CPF"

              onChange={handleChange} />
          </Form.Field>

          <Form.Field>
            <label>CEP</label>
            <MaskedInput
              name="cep"
              placeholder='CEP'
              onlyNumbers
              onChange={handleChange} />
          </Form.Field>
          <Form.Field>
            <label>Cidade</label>
            <input
              name="cidade"
              placeholder='Cidade'

              value={values.cidade}
              onChange={handleChange} />
          </Form.Field>
          <Form.Field>
            <label>Bairro</label>
            <input
              name="bairro"
              placeholder='Bairro'

              value={values.bairro}
              onChange={handleChange} />
          </Form.Field>
          <Form.Field>
            <label>Rua</label>
            <input
              name="logradouro"
              placeholder='Rua'

              value={values.logradouro}
              onChange={handleChange} />
          </Form.Field>

          <Form.Field>
            <label>Número</label>
            <input
              name="numero"
              placeholder='Número'
              value={values.numero}
              onChange={handleChange} />
          </Form.Field>

          <Button type='submit'>Cadastrar</Button>
        </Form>
      </Container>
    </div>
  )
}
