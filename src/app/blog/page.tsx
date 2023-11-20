import Link from "next/link"
import { getMetadataListLocal } from '@/lib/post'
import {type MetaData} from '@/types'

export default async function Page() {
  const data = await getMetadataListLocal()
  const tags = [...new Set(data.map((item: MetaData) => item.tags).flat())]

  return (
    <section className="flex">
      <div className="w-full lg:w-[600px]">
        <h1 className="mb-5 text-3xl font-bold">📚 My Blog</h1>
        {
          data.map((item: MetaData) => {
            return (
              <div key={item.slug} className="w-fit px-2 py-1 mb-4 rounded hover:bg-[#eee] dark:hover:bg-[#444]">
                <Link href={`/blog/${item.slug}`}>
                  <div className="flex flex-col">
                    <p className="font-mono mb-1">{item.title}</p>
                    <p className="font-mono text-sm text-neutral-500 tracking-tighter">{item.date}</p>
                  </div>
                </Link>
              </div>
            )
          })
        }
      </div>
      <div className='sticky h-fit ml-5 top-14 max-w-[250px] hidden lg:block'>
        <div className="mb-3 text-xl font-bold"># Tags</div>
        <div className="flex flex-wrap">
          {
            tags.map((item: string) => {
              return (
                <div key={item} className="w-fit text-sm px-2 py-1 mb-3 mr-3 rounded bg-[#eee] dark:bg-[#444]">
                  <Link href={`/tag/${item}`}>
                    <p className="font-mono">{item}</p>
                  </Link>
                </div>
              )
            })
          }
        </div>
      </div>
    </section>
  )
}
