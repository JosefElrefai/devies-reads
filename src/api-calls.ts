import { cookies } from "next/headers"
import { Book, SortBy } from "@/types"
import { API_BASE_URL } from "./constants"

export const logIn = async (username: string, password: string) => {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify({
      username,
      password,
    }),
  })

  const data = await res.json()
  if (data.accessToken != null) {
    cookies().set("session", data.accessToken, { httpOnly: true })
  }
}

export const isLoggedIn = async () => {
  const jwt = cookies().get("session")?.value

  const res = await fetch(`${API_BASE_URL}/is-logged-in`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
  return res.status === 200
}

export const registerAccount = async (username: string, password: string) => {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify({
      username,
      password,
    }),
  })
}

export const fetchAllBooks = async (sortBy: SortBy | null): Promise<Book[]> => {
  const jwt = cookies().get("session")?.value
  const query = sortBy ? `?sortBy=${sortBy}` : ""
  const res = await fetch(`${API_BASE_URL}/books` + query, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    cache: "no-store",
  })
  const data = res.json()
  return data
}

export const fetchBookById = async (id: string): Promise<Book> => {
  const jwt = cookies().get("session")?.value

  let res: Response | null = null
  try {
    res = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      cache: "no-store",
    })
  } catch (error) {
    let message = "Unknown Error"
    if (error instanceof Error) message = error.message
    throw new Error("Someting went wrong fetching book by id: " + message)
  }

  const data = res.json()
  return data
}

export const rateBook = async (id: string, rating: number) => {
  const jwt = cookies().get("session")?.value

  let res: Response | null = null
  try {
    res = await fetch(`${API_BASE_URL}/books/${id}/rate`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify({
        bookId: id,
        rating,
      }),
    })
  } catch (error) {
    let message = "Unknown Error"
    if (error instanceof Error) message = error.message
    throw new Error("Someting went wrong rating book " + message)
  }

  const data = res.json()
  return data
}
