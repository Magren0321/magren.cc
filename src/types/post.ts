export interface PostType{
  pageId: string
  pageTitle: string
  pageTime : string
  pageTags : string[]
  slug : string
  isPublic: boolean
}

export interface MetaData{
  title: string
	slug: string
	description: string
	publish: boolean
	date: string
	tags: string[]
}

export type Post<ContentType> = {
	metadata: MetaData
	content: ContentType
}

export type LocalPost = Post<string>
