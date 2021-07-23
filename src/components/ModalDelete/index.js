import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import {
  Button,
  Header,
  Icon,
  Modal
} from 'semantic-ui-react'

import { deleteClientAsync, clientById } from "../../store/slices/clientsSlice"

export default function ModalDelete({ clientId }) {
  const [open, setOpen] = React.useState(false)
  const dispatch = useDispatch()
  const client = useSelector(state => clientById(state, clientId))
  // console.log(clientId)

  const handleDelete = () => {
    setOpen(false)
    dispatch(deleteClientAsync(clientId))
  }

  return (
    <Modal
      closeIcon
      open={open}
      trigger={<Button size="small" ><Icon name="trash" />Excluir</Button>}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon='trash' content='Confirmar exclusão' />
      <Modal.Content>
        <p>
          Você deseja realmente excluir o cliente? <strong>{client.nome}</strong>
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={() => setOpen(false)} >
          <Icon name='remove' /> Não
        </Button>
        <Button color='green' onClick={handleDelete}>
          <Icon name='checkmark' /> Sim
        </Button>
      </Modal.Actions>
    </Modal>
  )
}
