'use client'

import { useHeadings } from "@/hooks/useHead"
import { useScroll } from "@/hooks/useScroll"
import cx from "classnames"

const TableOfContents = () =>{
  const headings = useHeadings()
  const activeId = useScroll(
    headings.map((heading) => heading.id),
    { rootMargin: `0% 0% -70% 0%` }
  )
  return(
    <div className="ml-2">
      {
        headings.length > 0 && (
          <div>
            <div className="font-bold mb-3">🔖 Table of contents</div>
            <div className="max-h-[calc(100vh-8rem)] overflow-y-auto overflow-x-hidden pr-2">
              {
                headings.map((item :{
                  id: string
                  title: string
                  level: number
                }) => {
                  return(
                    <div key={item.id} className={`w-44 overflow-hidden text-ellipsis whitespace-nowrap`} style={{
                      paddingLeft: (item.level - 1) * 16,
                    }}>
                      <a href={`#${item.id}`} className={cx('text-sm hover:underline',{
                        'font-bold underline': item.id === activeId,
                      })}>{item.title}</a>
                    </div>
                  )
                })
              }
            </div>
          </div>
        )
      }
    </div>
  )
}

export default TableOfContents