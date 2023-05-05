import { getPageData } from '@/lib/notion'
export default async function Page({params}:{params:{slug: string}}) {
  const data = await getPageData(params.slug)
  console.log(data)
  return (
    <section>

    </section>
  )
}