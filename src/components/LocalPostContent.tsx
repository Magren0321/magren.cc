import type { LocalPost } from "@/types/post"
import type { MDXRemoteProps } from "next-mdx-remote/rsc"
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from "next/link"


export default function LocalPostContent({ content, metadata }: LocalPost) {
	const idMap = new Map<string,number>(); //避免设置相同的id

  const getId = (text: string) =>{
    const count = idMap.get(text) || 0;
    idMap.set(text,count+1);
    return count ? `${text}-${count}` : text;
  }

	const components: MDXRemoteProps["components"] = {
		h1: props => {
			return (
				<h1 className="text-3xl mb-6 mt-8 font-bold" id={getId(props.children as string)}>
					{props.children}
				</h1>
			)
		},
		h2: props => {
			return (
				<h2 className="text-2xl mb-6 mt-8 font-bold" id={getId(props.children as string)}>
					{props.children}
				</h2>
			)
		},
		h3: props => {
			return (
				<h3 className="text-xl mb-6 mt-8 font-bold" id={getId(props.children as string)}>
					{props.children}
				</h3>
			)
		},
		a: (props) => {
			if (props.href && !props.href.startsWith("http")) {
				return <Link href={props.href}>{props.children}</Link>
			}
			return (
				<span className="not-prose">
					<a
						{...props}
						target="_blank"
						rel="noopener noreferrer"
						className="mr-px border-b border-neutral-300 hover:border-neutral-600 dark:border-neutral-600 dark:hover:border-neutral-300"
					>
						{props.children}
					</a>
					<sup>↗</sup>
				</span>
			)
		},
		img: (props) => (
			// eslint-disable-next-line @next/next/no-img-element
			<img
				src={props.src}
				alt={props.alt}
				className="mx-auto my-4"
			/>
		),
		
	}

	return (
		<MDXRemote
			source={content}
			components={components}
		/>
	)
}
