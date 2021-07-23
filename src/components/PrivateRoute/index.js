import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function PrivateRoute({ component: Component, ...rest }) {
  const token = useSelector(state => state.user.token)

  return (
    <Route
      {...rest}
      render={() => token ? (<Component {...rest} />) : <Redirect to="/login" />}
    >

    </Route>
  )
}
