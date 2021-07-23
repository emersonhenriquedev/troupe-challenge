import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { fetchClientsAsync, allClients } from "../../store/slices/clientsSlice"

import { Container } from 'semantic-ui-react'

import Header from "../../components/Header"
import UsersTable from '../../components/UsersTable'

export default function Home() {

  const dispatch = useDispatch()
  const status = useSelector(state => state.clients.status)
  const clients = useSelector(allClients)

  useEffect(() => {
    dispatch(fetchClientsAsync())
  }, [])


  return (
    <div>
      <Header />
      <Container>
        <h1>Clientes cadastrados</h1>
        <UsersTable clients={clients} />

      </Container>
    </div>
  )
}
