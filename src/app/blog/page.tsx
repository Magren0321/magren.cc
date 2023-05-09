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
            <div key={item.pageId}>
              <Link prefetch href={`/blog/${item.slug}`}>
                <div className="w-full flex flex-col mb-5">
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