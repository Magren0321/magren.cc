import { getPageData } from '@/lib/notion'
import NotionContent from '@/components/NotionContent'
import { Metadata } from "next"
import Link from 'next/link'
import Waline from '@/components/Waline'

export default async function Page({params}:{params:{slug: string}}) {
  const {page,blockResults} = await getPageData(params.slug)

  return (
    <section>
      <p className='text-4xl font-bold mb-5'>{page?.pageTitle}</p>
      <div className='text-gray-400 flex items-center flex-wrap'>{page?.pageTime} · 
        {
          page?.pageTags?.map((tag: any, index: number) => (
            <span key={index} className='ml-1 bg-gray-200 px-1 py-[1px] rounded text-sm dark:text-gray-700'>{tag.name}</span>
          ))
        }
      </div>
      <NotionContent blocks={blockResults}/>
      <div className='mt-10 font-mono opacity-50 hover:opacity-75'>
        <Link href={'/blog'}>{'>'}<span className='border-solid border-b-2 border-b-[#000] ml-2 dark:border-b-[#fff]'>cd . . </span></Link>
      </div>
      <div className='mt-10'>
        <Waline
          serverURL='https://waline.magren.cc'
          path={'/' + params.slug}
          emoji={[
            '//cdn.jsdelivr.net/gh/walinejs/emojis@1.1.0/tw-emoji'
          ]}
          search={false}
          dark={'auto'}
          login={'disable'}
          meta={['nick', 'mail','link']}
          imageUploader={false}
          copyright={false}
        />
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
