import { getBook } from "@/lib/notion"
import { BookType } from "@/types"

export default async function Page() {
  const data = Object.entries(await getBook())
  return (
    <section>
      <h1 className="mb-5 text-3xl font-serif">📖 My Reading List</h1>
      <span className='mt-5 text-xl font-serif'>Since 2021</span>
      {
        data.map(([key, value]) => {
          return(
            <div key={key} className="mt-10">
              <h2 className="mb-5 text-2xl font-serif font-bold">{key}</h2>
              {
                value.map((item: BookType) => {
                  return (
                    <div key={item.pageId} className="flex my-2">
                      {
                        item.status === 'Done' && <span className='ml-1 h-fit mr-2 px-1 py-[1px] rounded text-sm bg-[#EEE] dark:bg-[#444]'>{item.endTime}</span>
                      }
                      <p>《 {item.name} 》</p>
                    </div>
                  )
                })
              }
            </div>
          )
        })
      }
    </section>
  )
}