"use client"

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PaginationProps {
  currentPage: number
  totalPages: number
}

const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const getPageNumbers = () => {
    const pages = []
    const maxPagesToShow = 5
    
    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)
      
      if (currentPage > 3) {
        // Show ellipsis if current page is far from start
        pages.push('ellipsis')
      }
      
      // Pages around current
      const startPage = Math.max(2, currentPage - 1)
      const endPage = Math.min(totalPages - 1, currentPage + 1)
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }
      
      if (currentPage < totalPages - 2) {
        // Show ellipsis if current page is far from end
        pages.push('ellipsis')
      }
      
      // Always show last page
      pages.push(totalPages)
    }
    
    return pages
  }
  
  const pageNumbers = getPageNumbers()
  
  return (
    <div className="flex justify-center mt-12">
      <div className="flex items-center space-x-2">
        {/* Previous Page */}
        <Button
          variant="outline"
          size="icon"
          disabled={currentPage === 1}
          asChild={currentPage !== 1}
        >
          {currentPage === 1 ? (
            <span><ChevronLeft className="h-4 w-4" /></span>
          ) : (
            <Link href={`?page=${currentPage - 1}`}>
              <ChevronLeft className="h-4 w-4" />
            </Link>
          )}
        </Button>
        
        {/* Page Numbers */}
        {pageNumbers.map((page, i) => {
          if (page === 'ellipsis') {
            return (
              <Button key={`ellipsis-${i}`} variant="ghost" disabled className="px-0 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            )
          }
          
          const isCurrentPage = page === currentPage
          
          return (
            <Button
              key={page}
              variant={isCurrentPage ? "default" : "outline"}
              size="sm"
              className={cn("w-8 h-8", isCurrentPage && "bg-primary")}
              asChild={!isCurrentPage}
            >
              {isCurrentPage ? (
                <span>{page}</span>
              ) : (
                <Link href={`?page=${page}`}>{page}</Link>
              )}
            </Button>
          )
        })}
        
        {/* Next Page */}
        <Button
          variant="outline"
          size="icon"
          disabled={currentPage === totalPages}
          asChild={currentPage !== totalPages}
        >
          {currentPage === totalPages ? (
            <span><ChevronRight className="h-4 w-4" /></span>
          ) : (
            <Link href={`?page=${currentPage + 1}`}>
              <ChevronRight className="h-4 w-4" />
            </Link>
          )}
        </Button>
      </div>
    </div>
  )
}

export default Pagination