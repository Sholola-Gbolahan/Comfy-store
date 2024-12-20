/* eslint-disable react-refresh/only-export-components */
import { FormInput, SubmitBtn } from "../components"
import { Form, Link, useNavigate } from "react-router-dom"
import { redirect } from "react-router-dom"
import { customFetch } from "../utils"
import { toast } from "react-toastify"
import { loginUser } from "../features/user/userSlice"
import { useDispatch } from "react-redux"

const url = "/auth/local"

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    try {
      const response = await customFetch.post(url, data)
      // Accessing loginUser Reducer directly using store dispatch
      store.dispatch(loginUser(response.data))
      toast.success("Login successful")
      return redirect("/")
    } catch (error) {
      console.log(error)
      const errorMessage =
        error?.response?.data?.error?.message ||
        "please double check your credentials"
      toast.error(errorMessage)
      return null
    }
  }

const Login = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const loginAsGuestUser = async () => {
    try {
      const resp = await customFetch.post(url, {
        identifier: "text@text.com",
        password: "secret",
      })
      dispatch(loginUser(resp.data))
      toast.success("Welcome, guest user")
      navigate("/")
    } catch (error) {
      console.log(error)
      toast.error("guest user login error")
    }
  }

  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="post"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4 "
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput type="email" label="email" name="identifier" />
        <FormInput type="password" label="password" name="password" />
        <div className="mt-4">
          <SubmitBtn text="Login" />
        </div>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={loginAsGuestUser}
        >
          guest user
        </button>
        <p className="text-center">
          not a member yet?
          <Link
            to="/register"
            className="ml-2 link link-hover link-primary capitalize "
          >
            register
          </Link>
        </p>
      </Form>
    </section>
  )
}

export default Login
