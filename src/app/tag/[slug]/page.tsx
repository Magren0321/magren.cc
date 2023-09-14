import { getMetadataListLocal } from "@/lib/post"
import Link from "next/link";
import { type MetaData } from "@/types";
export default async function Page({params}: {
  params: { slug: string };
}){
  const allPost = (await getMetadataListLocal())
  .filter((item: MetaData) => item.tags.includes(decodeURIComponent(params.slug)));

  const dataMap: {[key:string]: MetaData[]} = {}

  allPost.forEach((item: MetaData) => {
    if(dataMap[item.date.split('/')[0]]){
      dataMap[item.date.split('/')[0]].push(item)
    }else{
      dataMap[item.date.split('/')[0]] = [item]
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
                dataMap[item].map((item: MetaData) => {
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
          )
        })
      }
    </div>
  )
}
