import { getPageData } from '@/lib/notion'
import NotionContent from '@/components/NotionContent'
import { Metadata } from "next"

export default async function Page({params}:{params:{slug: string}}) {
  const {page,blockResults} = await getPageData(params.slug)
  
  return (
    <section>
      <h1 className='text-4xl font-bold mb-5'>{page?.pageTitle}</h1>
      <div className='text-gray-400 flex items-center flex-wrap'>{page?.pageTime} · 
        {
          page?.pageTags?.map((tag: any, index: number) => (
            <span key={index} className='ml-1 bg-gray-200 px-1 py-[1px] rounded text-sm'>{tag.name}</span>
          ))
        }
      </div>
      <div>
        <NotionContent blocks={blockResults}/>
      </div>
    </section>
  )
}

export async function generateMetadata({
	params,
}: {
	params: { slug: string }
}): Promise<Metadata> {
	const { page } = await getPageData(params.slug)
	return { title: page?.pageTitle }
}