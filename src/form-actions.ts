"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { logIn, rateBook, registerAccount } from "./api-calls"
import { RateBookFormState } from "./app/books/[id]/rate-book-form"

export const logInAction = async (formData: FormData) => {
  const username = formData.get("username") as string
  const password = formData.get("password") as string
  await logIn(username, password)
  redirect("/")
}

export const rateBookAction = async (
  prevState: RateBookFormState,
  formData: FormData
): Promise<RateBookFormState> => {
  const bookId = formData.get("bookId") as string
  const rating = formData.get("rating") as string
  const ratingNumber = Number(rating)

  if (ratingNumber < 0 || ratingNumber > 5) {
    return {
      rating,
      errors: {
        rating: "Rating must be between 0 and 5",
      },
    }
  }
  if (Number.isNaN(ratingNumber)) {
    return {
      rating,
      errors: {
        rating: "Invalid input",
      },
    }
  }

  await rateBook(bookId, ratingNumber)
  revalidatePath(`/books/${bookId}`, "page")

  return {
    rating: "",
    errors: {
      rating: null,
    },
  }
}

export const registerAccountAction = async (formData: FormData) => {
  const username = formData.get("username") as string
  const password = formData.get("password") as string

  await registerAccount(username, password)
  redirect("/login")
}
