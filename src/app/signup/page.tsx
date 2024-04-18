import { Metadata } from "next"
import { registerAccountAction } from "@/form-actions"
import s from "./page.module.css"

export const metadata: Metadata = {
  title: "Sign Up | Devies Reads",
}

export default function SignUpPage() {
  return (
    <main className={s.main}>
      <h1>Sign up</h1>
      <form className={s.form} action={registerAccountAction}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" />

        <label htmlFor="password">Password:</label>
        <input type="text" id="password" name="password" />

        <button type="submit">Register account</button>
      </form>
    </main>
  )
}
