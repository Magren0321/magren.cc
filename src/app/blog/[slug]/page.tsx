import { getPageData } from '@/lib/notion'
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
    </section>
  )
}