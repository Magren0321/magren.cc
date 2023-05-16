import { BookType } from "@/types";

const notionToken = process.env.NOTION_KEY!;
const databaseId = process.env.NOTION_DATABASE_ID!
const notionBookDatabaseId = process.env.NOTION_BOOK_ID!;

const revalidate = 60 * 60 * 2; // 2 hours

const fetcher = (url: string, option: any) =>
  fetch(url, {
    ...option,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
      Authorization: `Bearer ${notionToken}`
    },
    next: {
      revalidate,
    },
  }).then((res) => res.json());

export const getAllPost = async () => {
  const { results } = await fetcher(`https://api.notion.com/v1/databases/${databaseId}/query`, {
    method: "POST",
  });

  const res = results.map((result: any) => {

    const pageId = result.id;
    const pageTitle = result.properties.name.title[0].plain_text;
    const pageTime = result.properties.date.date.start;
    const pageTags = result.properties.tags.multi_select;
    const slug = result.properties.slug.rich_text[0].plain_text;
    const isPublic = result.properties.isPublic.checkbox;
    
    if(isPublic){
      return {
        pageId,
        pageTitle,
        pageTime,
        pageTags,
        slug,
        isPublic
      }
    }
  }).filter(Boolean);

  return res;
}

export const getPageId = async (slug: string) =>{
  const postList = await getAllPost();
  return postList.find((item: any) => item.slug === slug);
}

export const getPageData =  async (slug: string) =>{   
    const page = await getPageId(slug);
    const { results } = await fetcher(`https://api.notion.com/v1/blocks/${page.pageId}/children`, {
      method: "GET"
    })
    return {
      page,
      blockResults: results
    }
}

export const getBook = async () => {
  const { results } = await fetcher(`https://api.notion.com/v1/databases/${notionBookDatabaseId}/query`, {
    method: "POST",
  });
  const Reading: BookType[] = [];
  const Done: BookType[] = [];
  const Plan: BookType[] = [];

  results.map((result: any) => {
    const pageId = result.id;
    const name = result.properties.Name.title[0].plain_text;
    const status = result.properties.Status.status.name;
    const endTime = result.properties.EndTime.select ? result.properties.EndTime.select.name : '';
    const obj = {
      pageId,
      name,
      status,
      endTime
    }
    switch (status) {
      case 'Reading':
        Reading.push(obj);
        break;
      case 'Done':
        Done.push(obj);
        break;
      case 'Ready to start':
        Plan.push(obj);
        break;
    }
  })

  return {
    Reading,
    Plan,
    Done
  }
}