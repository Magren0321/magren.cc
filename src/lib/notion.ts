import { Client } from "@notionhq/client"

const notion = new Client({ auth: process.env.NOTION_KEY })!
const databaseId = process.env.NOTION_DATABASE_ID!


export const getAllPost = async () => {
  const { results } = await notion.databases.query({
    database_id:databaseId
  });

  const res = results.map((result: any) => {

    const pageId = result.id;
    const pageTitle = result.properties.name.title[0].plain_text;
    const pageTime = result.properties.date.date.start;
    const pageTags = result.properties.tags.multi_select;
    const slug = result.properties.slug.rich_text[0].plain_text;

    return {
      pageId,
      pageTitle,
      pageTime,
      pageTags,
      slug
    }
  });
  return res;
} 

export const getPageId = async (slug: string) =>{
  const postList = await getAllPost();
  return postList.find((item: any) => item.slug === slug);
}

export const getPageData =  async (slug: string) =>{   
    const page = await getPageId(slug);
    const { results: blockResults } = await notion.blocks.children.list({
      block_id: page?.pageId,
    });
    return {
      page,
      blockResults
    }
}