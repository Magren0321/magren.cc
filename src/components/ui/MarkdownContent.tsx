"use client"

export default function MarkdownWrapper({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<article className="flex flex-col markdown">
			{children}
		</article>
	)
}
