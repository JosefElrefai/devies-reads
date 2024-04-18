"use client"

import { useRouter } from "next/navigation"
import s from "./page.module.css"

export default function FilterBooksForm() {
  const router = useRouter()

  return (
    <form
      className={s.form}
      onSubmit={(e) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const formData = new FormData(form)
        const sortBy = formData.get("sortBy") as string
        const nameSearch = formData.get("nameSearch") as string

        const searchParams = new URLSearchParams()
        if (sortBy.length) searchParams.append("sortBy", sortBy)
        if (nameSearch.length) searchParams.append("nameSearch", nameSearch)
        const queryString = searchParams.toString()

        if (queryString.length) router.push("/?" + searchParams)
        else router.push("/")

        form.reset()
      }}
    >
      <select id="sortBy" name="sortBy">
        <option value="">Sort by</option>
        <option value="name">Name</option>
        <option value="haveRead">Have read</option>
        <option value="currentlyReading">Currently reading</option>
        <option value="wantToRead">Want to read</option>
      </select>

      <input
        type="text"
        placeholder="Search by name"
        id="nameSearch"
        name="nameSearch"
      />
      <button type="submit">Search</button>
    </form>
  )
}
