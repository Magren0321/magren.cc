import { getAllPost } from "@/lib/notion"
import Link from "next/link";

export default async function Page({params}: {
  params: { slug: string };
}){
  const allPost = (await getAllPost())
  .filter((item: any) => item.pageTags.map((item: any) => item.name).includes(decodeURIComponent(params.slug)));

  console.log(allPost)
  const dataMap: {[key:string]: any} = {}

  allPost.forEach((item: any) => {
    if(dataMap[item.pageTime.split('-')[0]]){
      dataMap[item.pageTime.split('-')[0]].push(item)
    }else{
      dataMap[item.pageTime.split('-')[0]] = [item]
    }
  })
  
  return (
    <div>
      <div className="text-3xl font-bold mb-7 ml-2"># {decodeURIComponent(params.slug)}</div>
      {
        Object.keys(dataMap).reverse().map((item: string) => {
          return (
            <div key={item} className="mb-5">
              <div className="text-2xl font-bold mb-3 px-2">{item}</div>
              {
                dataMap[item].map((item: any) => {
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
            </div>
          )
        })
      }
    </div>
  )
}