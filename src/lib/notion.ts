import { Client } from "@notionhq/client"

const notion = new Client({ auth: process.env.NOTION_KEY })!
const databaseId = process.env.NOTION_DATABASE_ID!

/**
 * 获取数据库里边的数据
 */
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

/**
 * 根据文章id获取内容
 * @param id 
 * @returns 
 */
export const getPageData =  async (id: string) =>{   
    // 获取 page 的 Block 内容
    const { results: blockResults } = await notion.blocks.children.list({
      block_id: id,
    });
    return blockResults;
}