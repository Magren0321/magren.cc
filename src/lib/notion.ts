import { Client } from "@notionhq/client"

const notion = new Client({ auth: process.env.NOTION_KEY })!
const databaseId = process.env.NOTION_DATABASE_ID!


export const getAllPost = async () => {
  const { results } = await notion.databases.query({
    database_id:databaseId
  });
  // 遍历查询结果
  const res = results.map((result: any) => {
    // 获取 page 的 id、title 和时间
    const pageId = result.id;
    const pageTitle = result.properties.name.title[0].plain_text;
    const pageTime = result.properties.date.date.start;
    const slug = result.properties.slug.rich_text[0].plain_text;

    return {
      pageId,
      pageTitle,
      pageTime,
      slug
    }
  });
  return res;
} 

export const getPageId = async (slug: string) =>{
  const postList = await getAllPost();
  return postList.find((item: any) => item.slug === slug)?.pageId;
}

export const getPageData =  async (slug: string) =>{   
    const id = await getPageId(slug);
    const { results: blockResults } = await notion.blocks.children.list({
      block_id: id,
    });
    return blockResults;
}