import { configureStore } from '@reduxjs/toolkit'
import apis from "./api"
export const store = configureStore({
  reducer: {
    Allapi:apis
  },
})