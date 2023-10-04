import { getPostFromLocal } from '@/lib/post'
import LocalPostContent from '@/components/LocalPostContent'
import { Metadata } from "next"
import Link from 'next/link'
import Waline from '@/components/Waline'
import TableOfContents from '@/components/TableOfContents'

export default async function Page({params}:{params:{slug: string}}) {
  const {metadata,content} = await getPostFromLocal(params.slug)

  return (
    <section>
      <p className='text-4xl font-bold mb-5'>{metadata?.title}</p>
      <div className='text-gray-700 flex items-center flex-wrap dark:text-gray-200'>{metadata?.date} · 
        {
          metadata?.tags?.map((tag: string, index: number) => (
            <span key={index} className='ml-1 bg-gray-200 px-1 py-[1px] rounded text-sm dark:text-gray-700'>{tag}</span>
          ))
        }
      </div>
      <div className='flex flex-row justify-between mt-10'>
        
        <article className='prose dark:prose-invert leading-8 w-full lg:w-[640px]'>
          <LocalPostContent content={content} metadata={metadata} />
        </article>
        <div className='sticky h-fit top-14 max-w-[270px] hidden lg:block'>
          <TableOfContents />
        </div>
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
	const { metadata } = await getPostFromLocal(params.slug)
	return { title: metadata?.title }
}
