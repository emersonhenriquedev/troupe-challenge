import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import {
  Table,
  Icon,
  Button,
  Loader,
  Dimmer
} from "semantic-ui-react"

import ModalDelete from '../../components/ModalDelete'

export default function UsersTable({ clients }) {

  const status = useSelector(state => state.clients.status)

  return (
    <div>
      {status === 'pending' ?
        (
          <Dimmer active>
            <Loader size='massive'>Carregando dados</Loader>
          </Dimmer>
        )
        :
        (
          <Table >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Nome</Table.HeaderCell>
                <Table.HeaderCell>CPF</Table.HeaderCell>
                <Table.HeaderCell>E-mail</Table.HeaderCell>
                <Table.HeaderCell>Cidade</Table.HeaderCell>
                <Table.HeaderCell>Ações</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {clients.map(client => {
                return (

                  <Table.Row key={client.id}>
                    <Table.Cell>{client.nome}</Table.Cell>
                    <Table.Cell>{client.cpf}</Table.Cell>
                    <Table.Cell>{client.email}</Table.Cell>
                    <Table.Cell>{client.endereco.cidade}</Table.Cell>
                    <Table.Cell>
                      <Button as={Link} to={`client/${client.id}`}  size="small" ><Icon name="edit" />Editar</Button>
                      {/* <Button size="small" onClick={(e) => handleDelete(client.id)} ><Icon name="trash" />Excluir</Button> */}
                      <ModalDelete clientId={client.id} />
                    </Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body>

            {/* <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan='5'>
                  <Menu floated='right' pagination>
                    <Menu.Item as='a' icon>
                      <Icon name='chevron left' />
                    </Menu.Item>
                    <Menu.Item as='a'>1</Menu.Item>
                    <Menu.Item as='a'>2</Menu.Item>
                    <Menu.Item as='a'>3</Menu.Item>
                    <Menu.Item as='a'>4</Menu.Item>
                    <Menu.Item as='a' icon>
                      <Icon name='chevron right' />
                    </Menu.Item>
                  </Menu>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer> */}
          </Table>
        )}

        
    </div>
  )
}
