import fs from "node:fs/promises";
import path from "node:path";
import { serialize } from "next-mdx-remote/serialize"
import matter from "gray-matter";
import type { LocalPost, MetaData } from '../types'

const root = process.cwd();
const POSTS_PATH = path.join(root, "src", "posts");

export async function getPostFromLocal(fileName: string): Promise<LocalPost> {

	const slug = fileName.replace(/\.mdx$/, "")
	const filePath = path.join(POSTS_PATH, `${slug}.mdx`);
	const raw = await fs.readFile(filePath, "utf-8")
	const { content } = matter(raw)
	const serialized = await serialize(raw, {
		parseFrontmatter: true
	})

	const frontmatter = serialized.frontmatter as unknown as MetaData

	return {
		metadata: frontmatter,
		content: content
	}
}


export async function getMetadataListLocal(): Promise<MetaData[]> {
	const posts = await fs.readdir(POSTS_PATH)

	const postsData = await Promise.all(
		posts.map(async (post) => {
			return (await getPostFromLocal(post)).metadata
		}),
	)
	
	return postsData.sort((a: MetaData, b: MetaData) => {
		return new Date(b.date).getTime() - new Date(a.date).getTime()
	}).filter((post:MetaData) => post.publish)
}
