"use client"

export default function MarkdownWrapper({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<article className="flex flex-col prose text-black dark:text-white">
			{children}
		</article>
	)
}
