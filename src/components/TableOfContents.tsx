'use client'

import { useHeadings } from "@/hooks/useHead"
import { useEffect,useState } from "react"

const TableOfContents = () =>{
  const headings = useHeadings()

  return(
    <div>
      {
        headings.map((item :{
          id: string
          title: string
          level: number
        }) => {
          return(
            <div key={item.id} className={`mb-1 w-30 overflow-hidden text-ellipsis whitespace-nowrap `} style={{
              paddingLeft: (item.level - 1) * 10,
            }}>
              <a href={`#${item.id}`} className='text-sm hover:underline'>{item.title}</a>
            </div>
          )
        })
      }
    </div>
  )
}

export default TableOfContents