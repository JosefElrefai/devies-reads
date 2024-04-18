import { fetchAllBooks } from "@/api-calls"
import s from "./page.module.css"
import Link from "next/link"
import FilterBooksForm from "./filter-books-form"
import { isSortBy } from "@/types"

export default async function HomePage({
  searchParams: { nameSearch, sortBy },
}: {
  searchParams: { sortBy?: string; nameSearch?: string }
}) {
  const books = await fetchAllBooks(isSortBy(sortBy) ? sortBy : null)
  const bugFreeBooks = books.filter((b) => typeof b.id === "string")
  let filteredBooks = bugFreeBooks
  if (nameSearch != null) {
    filteredBooks = bugFreeBooks.filter((book) =>
      book.name.toLowerCase().includes(nameSearch.toLowerCase())
    )
  }

  return (
    <main className={s.main}>
      <h1>Books</h1>
      <FilterBooksForm />
      <ul>
        {filteredBooks.map((book) => (
          <li className={s.book} key={book.id}>
            <Link href={`/books/${book.id}`}>
              <p>
                <strong>name:</strong> {book.name}
              </p>
              <p>
                <strong>genre:</strong> {book.genre}
              </p>
              <p>
                <strong>averageRating:</strong>{" "}
                {Math.round(book.averageRating * 100) / 100}
              </p>
              <p>
                <strong>haveRead:</strong> {book.haveRead}
              </p>
              <p>
                <strong>currentlyReading:</strong> {book.currentlyReading}
              </p>
              <p>
                <strong>userRating:</strong> {book.userRating || "--"}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
