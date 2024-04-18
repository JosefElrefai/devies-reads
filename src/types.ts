export type Book = {
  id?: string
  name: string
  genre: string
  coverUrl: string
  description: string
  averageRating: number
  haveRead: number
  currentlyReading: number
  wantToRead: number
  userRating: number
}

const sortByValidValues = [
  "name",
  "haveRead",
  "currentlyReading",
  "wantToRead",
] as const

export type SortBy = (typeof sortByValidValues)[number]
export function isSortBy(value: unknown): value is SortBy {
  return typeof value === "string" && sortByValidValues.includes(value as any)
}
