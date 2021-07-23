import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import {
  Container,
  Form,
  Button,
  Label
} from "semantic-ui-react"

import Header from "../../components/Header"
import MaskedInput from '../../components/MaskedInput'

import { addClientAsync, updateClientAsync } from "../../store/slices/clientsSlice"


export default function Client(props) {

  const { clientId } = useParams()
  const existingClient = useSelector(state => state.clients.clients.find(c => c.id == clientId))
  const [isEditMode, setIsEditMode] = useState(existingClient !== undefined)


  const dispatch = useDispatch()
  const history = useHistory()

  const initialState = {
    // id: existingClient?.id,
    nome: existingClient?.nome,
    cpf: existingClient?.cpf,
    email: existingClient?.email,
    cep: existingClient?.endereco.cep,
    logradouro: existingClient?.endereco.rua,
    numero: existingClient?.endereco.numero,
    bairro: existingClient?.endereco.bairro,
    cidade: existingClient?.endereco.cidade
  }

  const [values, setValues] = useState(initialState)
  const [hasError, setHasError] = useState(undefined)

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
    console.log(hasEmpty)

    if (hasEmpty !== -1) {
      setHasError(true)
      console.log('tem vazio')
      return
    }

    setHasError(false)

    try {
      if (isEditMode) {
        dispatch(updateClientAsync({ ...values, id: clientId }))
        history.push('/')
      } else {
        dispatch(addClientAsync(values))
        history.push('/')
      }
    } catch (err) {
      console.log(err)
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
              value={values.nome}
              onChange={handleChange}
            />

            {hasError && !values.nome && (<Label basic color="red">
              Este campo é obrigatório
            </Label>
            )}
          </Form.Field>
          <Form.Field>
            <label>E-mail</label>
            <input
              error
              name='email'
              placeholder='E-mail'
              value={values.email}
              onChange={handleChange}
            />

            {hasError && !values.email && (<Label basic color="red">
              Este campo é obrigatório
            </Label>
            )}
          </Form.Field>
          <Form.Field>
            <label>CPF</label>
            {/* <input placeholder='CPF' /> */}
            <MaskedInput
              mask="999.999.999-99"
              name="cpf"
              placeholder="CPF"
              value={values.cpf}
              onChange={handleChange}
            />
            {hasError && !values.cpf && (<Label basic color="red">
              Este campo é obrigatório
            </Label>
            )}
          </Form.Field>

          <Form.Field>
            <label>CEP</label>
            <MaskedInput
              mask="99999-999"
              name="cep"
              placeholder='CEP'
              onlyNumbers
              value={values.cep}
              onChange={handleChange}
            />
            {hasError && !values.cep && (<Label basic color="red">
              Este campo é obrigatório
            </Label>
            )}

          </Form.Field>
          <Form.Field>
            <label>Cidade</label>
            <input
              name="cidade"
              placeholder='Cidade'
              value={values.cidade}
              onChange={handleChange}
            />
            {hasError && !values.cidade && (<Label basic color="red">
              Este campo é obrigatório
            </Label>
            )}

          </Form.Field>
          <Form.Field>
            <label>Bairro</label>
            <input
              name="bairro"
              placeholder='Bairro'
              value={values.bairro}
              onChange={handleChange}
            />
            {hasError && !values.bairro && (<Label basic color="red">
              Este campo é obrigatório
            </Label>
            )}

          </Form.Field>
          <Form.Field>
            <label>Rua</label>
            <input
              name="logradouro"
              placeholder='Rua'
              value={values.logradouro}
              onChange={handleChange}
            />
            {hasError && !values.logradouro && (<Label basic color="red">
              Este campo é obrigatório
            </Label>
            )}

          </Form.Field>

          <Form.Field>
            <label>Número</label>
            <input
              name="numero"
              placeholder='Número'
              value={values.numero}
              onChange={handleChange}
            />
            {hasError && !values.numero && (<Label basic color="red">
              Este campo é obrigatório
            </Label>
            )}

          </Form.Field>

          <Button type='submit'>Cadastrar</Button>
        </Form>
      </Container>
    </div>
  )
}
