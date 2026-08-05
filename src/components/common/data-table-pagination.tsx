'use client'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface DataTablePaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function DataTablePagination({
  page,
  totalPages,
  onPageChange,
}: DataTablePaginationProps) {
  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  )

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={e => {
              e.preventDefault()

              if (page > 1) {
                onPageChange(page - 1)
              }
            }}
          />
        </PaginationItem>

        {pages.map(p => (
          <PaginationItem key={p}>
            <PaginationLink
              href="#"
              isActive={p === page}
              onClick={e => {
                e.preventDefault()
                onPageChange(p)
              }}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={e => {
              e.preventDefault()

              if (page < totalPages) {
                onPageChange(page + 1)
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}