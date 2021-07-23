import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./slices/userSlice"
import clientsReducer from "./slices/clientsSlice"

export default configureStore({
  reducer: {
    user: userReducer,
    clients: clientsReducer
  }
})