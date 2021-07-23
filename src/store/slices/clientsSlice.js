import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  clients: [],
  status: 'idle'
}

export const fetchClientsAsync = createAsyncThunk(
  'clients/fetch',
  async () => {
    const response = await axios.get('http://localhost:5000/clientes')
    return response.data
  }
)

export const addClientAsync = createAsyncThunk(
  'clients/add',
  async (payload) => {
    const response = await axios.post(`http://localhost:5000/clientes`, {
      nome: payload.nome,
      cpf: payload.cpf,
      email: payload.email,
      endereco: {
        cep: payload.cep,
        rua: payload.logradouro,
        numero: payload.numero,
        bairro: payload.bairro,
        cidade: payload.cidade
      }
    })

    const client = response.data
    return client
  })

  export const deleteClientAsync = createAsyncThunk(
    'client/delete',
    async (payload) => {
      const response = await axios.delete(`http://localhost:5000/clientes/${payload}`)
      return payload

    }
  )

export const updateClientAsync = createAsyncThunk(
  'clients/update',
  async (payload) => {
    const response = await axios.put(`http://localhost:5000/clientes/${payload.id}`, {
      nome: payload.nome,
      cpf: payload.cpf,
      email: payload.email,
      endereco: {
        cep: payload.cep,
        rua: payload.logradouro,
        numero: payload.numero,
        bairro: payload.bairro,
        cidade: payload.cidade
      }
    })

    const client = response.data
    return client
  })

const clientsReducer = createSlice({
  name: 'clients',
  initialState: initialState,
  extraReducers: {
    [fetchClientsAsync.pending]: (state, action) => {
      state.status = 'pending'
    },
    [fetchClientsAsync.fulfilled]: (state, action) => {
      // console.log(action.payload)
      state.clients = action.payload
      // state.clients.push(...action.payload)

      state.status = 'fulfilled'
    },
    [addClientAsync.pending]: (state, action) => {
      state.status = 'pending'
    },
    [addClientAsync.fulfilled]: (state, action) => {
      state.status = 'fulfilled'
      state.clients.push(action.payload)
    },
    [updateClientAsync.pending]: (state, action) => {
      state.status = 'pending'
    },
    [updateClientAsync.fulfilled]: (state, action) => {
      state.status = 'fulfilled'
      const existingClient = state.clients.find(client => client === action.payload.id)
      console.log('aqui')
      if (existingClient) {

        existingClient.nome = action.payload.nome
        existingClient.cpf = action.payload.cpf
        existingClient.email = action.payload.email
        existingClient.endereco.cep = action.payload.cep
        existingClient.endereco.rua = action.payload.logradouro
        existingClient.endereco.numero = action.payload.numero
        existingClient.endereco.bairro = action.payload.bairro
        existingClient.endereco.cidade = action.payload.cidade

      }

    },
    [deleteClientAsync.pending]: (state,action) => {
      state.status = 'pending'
    },
    
    [deleteClientAsync.fulfilled]: (state,action) => {
      console.log(action)
      const remainClients = state.clients.filter((client) => client.id !== action.payload)
      state.clients = remainClients
      state.status = 'fulfilled'

    }
  }
})

export const allClients = state => state.clients.clients
export const clientById = (state, id) => state.clients.clients.find(client => client.id == id)

//export const { } = clientsReducer.actions
export default clientsReducer.reducer
