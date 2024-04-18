"use client"

import { useFormState } from "react-dom"
import { rateBookAction } from "@/form-actions"
import s from "./page.module.css"

export type RateBookFormState = {
  rating: string | null
  errors: {
    rating: string | null
  }
}

export default function RateBookForm({ id }: { id: string }) {
  const [formState, wrappedRateBookAction] = useFormState(rateBookAction, {
    rating: "",
    errors: {
      rating: null,
    },
  } as RateBookFormState)

  return (
    <form className={s.form} action={wrappedRateBookAction}>
      <input name="bookId" type="hidden" value={id} aria-hidden />
      <label htmlFor="rating">Rate book:</label>
      <input
        // TODO: Make sure input value emptys after submit
        defaultValue={formState.rating ?? undefined}
        type="number"
        id="rating"
        name="rating"
        min={0}
        max={5}
      />
      <button type="submit">Submit rating</button>
    </form>
  )
}
