import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

const initialState = {
  user: [],
  theme: "dracula",
}

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    loginUser: (state, action) => {
      console.log("login")
    },

    logoutUser: (state) => {
      console.log("logout")
    },

    toggleTheme: (state) => {
      console.log("toggleTheme")
    },
  },
})

export const { loginUser, logoutUser, toggleTheme } = userSlice.actions

export default userSlice.reducer
