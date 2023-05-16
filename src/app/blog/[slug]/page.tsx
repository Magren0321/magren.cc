import { getPageData } from '@/lib/notion'
import NotionContent from '@/components/NotionContent'
import { Metadata } from "next"
import Link from 'next/link'

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
      <div className='mt-10 font-mono opacity-50 hover:opacity-75'>
        <Link href={'/blog'}>{'>'}<span className='border-solid border-b-2 border-b-[#000] ml-2 dark:border-b-[#fff]'>cd . . </span></Link>
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