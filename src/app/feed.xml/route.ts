import RSS from 'rss'
import { getAllPost } from '../../lib/notion'
import type { PostType } from '@/types'

export async function GET() {
  const feed = new RSS({
    title: `Magren's Blog`,
    description: '不为繁华易匠心',
    site_url: 'https://magren.cc', 
    feed_url: 'https://magren.cc/feed.xml', 
    language: 'en', // 网站语言代码
    image_url: 'https://magren.cc/avatar.png', // 放一个叫 opengraph-image.png 的1200x630尺寸的图片到你的 app 目录下即可
  })
  const data = await getAllPost()

  data.forEach((post: PostType) => {
    feed.item({
      title: post.pageTitle,
      guid: post.pageId, 
      url: `https://magren.cc/blog/${post.slug}`,
      description: post.pageTitle, 
      date: new Date(post.pageTime), 
    })
  })
 
  return new Response(feed.xml(), {
    headers: {
      'content-type': 'application/xml'
    }
  })
}
