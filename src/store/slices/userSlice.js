import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  name: 'Emerson',
  token: localStorage.getItem('troupeChallenge') || null
}

export const userReducer = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    login: {
      reducer(state, action) {
        state.token = action.payload
      },
      prepare() {
        const token = nanoid(4)

        localStorage.setItem('troupeChallenge', token)
        return {
          payload: token
        }
      }
    },
    logout: {
      reducer(state, action) {
        state.token = action.payload
      },
      prepare() {
        localStorage.removeItem('troupeChallenge')
        return {
          payload: null
        }
      }
    }
  }
})

export const { login, logout } = userReducer.actions

export default userReducer.reducer