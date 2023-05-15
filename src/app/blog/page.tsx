import { getAllPost } from "@/lib/notion"
import Link from "next/link"

export default async function Page() {
  const data = await getAllPost()
  return (
    <section>
      <h1 className="mb-5 text-3xl font-serif">📚 My Blog</h1>
      {
        data.map((item: any) => {
          return (
            <div key={item.pageId} className="w-fit px-2 py-1 mb-4 rounded hover:bg-[#eee] dark:hover:bg-[#444]">
              <Link href={`/blog/${item.slug}`}>
                <div className="flex flex-col">
                  <p className="font-mono mb-1">{item.pageTitle}</p>
                  <p className="font-mono text-sm text-neutral-500 tracking-tighter">{item.pageTime}</p>
                </div>
              </Link>
            </div>
          )
        })
      }

    </section>
  )
}