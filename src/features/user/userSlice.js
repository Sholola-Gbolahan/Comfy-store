import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

const themes = {
  winter: "winter",
  dracula: "dracula",
}

const getThemeFromLocalStorage = () => {
  const theme = localStorage.getItem("theme") || themes.winter
  document.documentElement.setAttribute("data-theme", theme)
}

const initialState = {
  user: { username: "Sholola Gbolahan" },
  theme: getThemeFromLocalStorage(),
}

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    loginUser: (state, action) => {
      console.log(action.payload)
    },

    logoutUser: (state) => {
      // setting user to null to logout
      state.user = null
      // Clearing user from local storage
      localStorage.removeItem("user")
      toast.success("logged out successfully")
    },

    toggleTheme: (state) => {
      const { dracula, winter } = themes
      state.theme = state.theme === dracula ? winter : dracula
      document.documentElement.setAttribute("data-theme", state.theme)
      localStorage.setItem("theme", state.theme)
    },
  },
})

export const { loginUser, logoutUser, toggleTheme } = userSlice.actions

export default userSlice.reducer
