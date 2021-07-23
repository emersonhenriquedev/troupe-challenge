import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import {
  Menu,
  Button
} from "semantic-ui-react"
import { logout } from "../../store/slices/userSlice"

export default function Header() {

  const [activeItem, setActiveItem] = useState('home')
  const history = useHistory()
  const dispatch = useDispatch()

  const handleItemClick = (e, { name }) => {
    setActiveItem(name)
    history.push(name)

  }

  return (
    <Menu size='large'>
      <Menu.Item
        content="Home"
        name='/'
        active={activeItem === '/'}
        onClick={handleItemClick}
      />
      <Menu.Item
        content="Novo cliente"
        name='client'
        active={activeItem === 'client'}
        onClick={handleItemClick}
      />

      <Menu.Menu position='right'>

        <Menu.Item>
          <Button primary onClick={() => dispatch(logout())}>Sair</Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}
