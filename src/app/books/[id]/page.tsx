import { Metadata } from "next"
import { notFound } from "next/navigation"
import { fetchBookById } from "@/api-calls"
import RateBookForm from "./rate-book-form"
import s from "./page.module.css"

export const metadata: Metadata = {
  title: "Book Details | Devies Reads",
}

// NOTE: There seems to be a bug in the api where by "userRating" does not update after the user submits a rating,
// the "averageRating" does update however
export default async function BookPage({ params }: { params: { id: string } }) {
  const book = await fetchBookById(params.id)
  if (book.id == null) return notFound()

  return (
    <div className={s.page}>
      <h1>Book {book.name}</h1>

      <div className={s.book}>
        <p>
          <strong>id:</strong> {book.id}
        </p>
        <p>
          <strong>name:</strong> {book.name}
        </p>
        <p>
          <strong>genre:</strong> {book.genre}
        </p>
        <p>
          <strong>coverUrl:</strong> {book.coverUrl}
        </p>
        <p>
          <strong>description:</strong> {book.description}
        </p>
        <p>
          <strong>averageRating:</strong> {book.averageRating}
        </p>
        <p>
          <strong>haveRead:</strong> {book.haveRead}
        </p>
        <p>
          <strong>currentlyReading:</strong> {book.currentlyReading}
        </p>
        <p>
          <strong>wantToRead:</strong> {book.wantToRead}
        </p>
        <p>
          <strong>userRating:</strong> {book.userRating || "--"}
        </p>
      </div>

      <RateBookForm id={params.id} />
    </div>
  )
}
