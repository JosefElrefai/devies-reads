import Link from "next/link"
import { logInAction } from "@/form-actions"
import s from "./page.module.css"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign In | Devies Reads",
}

export default function LoginPage() {
  return (
    <main className={s.main}>
      <h1>Login</h1>
      <form className={s.form} action={logInAction}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" />
        <label htmlFor="password">Password:</label>
        <input type="text" id="password" name="password" />
        <button type="submit">Sign in</button>
      </form>
      <Link href="/signup">Sign up</Link>
    </main>
  )
}
