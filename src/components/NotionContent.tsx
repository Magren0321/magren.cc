'use client'

import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import TableOfContents from "./TableOfContents";
import cx from "classnames";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github , darcula } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Text = ({ text } : any) => {
  if (!text) {
    return null;
  }
  return text.map((value: any, index: number) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value;
    return (
      <span
        className={cx({
            "font-bold": bold,
            "font-mono bg-gray-100 p-1 rounded dark:bg-gray-800": code,
            "text-red-500": color === "red",
            "text-green-500": color === "green",
            "text-blue-500": color === "blue",
            "text-purple-500": color === "purple",
            "text-pink-500": color === "pink",
            "text-yellow-500": color === "yellow",
            "text-gray-500": color === "gray",
            "text-orange-500": color === "orange",
            italic,
            "line-through": strikethrough,
            underline
          },"break-all")
        }
        key={text.content + index}
      >
        {text.link ? <Link href={text.link.url} className="underline">{text.content}</Link> : text.content}
      </span>
    );
  });
};

export default function NotionContent({ blocks } : {blocks: any}){

  const idMap = new Map<string,number>();
  
  const getId = (text: string) =>{
    const count = idMap.get(text) || 0;
    idMap.set(text,count+1);
    return count ? `${text}-${count}` : text;
  }
  
  const renderNestedList = (block: any) => {
    const { type } = block;
    const value = block[type];
    if (!value) return null;
    const isNumberedList = value.children[0].type === "numbered_list_item";
  
    if (isNumberedList) {
      return <ol>{value.children.map((block: any) => renderBlock(block))}</ol>;
    }
    return <ul>{value.children.map((block: any) => renderBlock(block))}</ul>;
  };
  
  const renderBlock = (block :any) => {
    const { type, id } = block;
    const value = block[type];
    let hId
    if(type === "heading_1" || type === "heading_2" || type === "heading_3"){
      hId = getId(value.rich_text[0].plain_text);
    }
    switch (type) {
      case "paragraph":
        return (
          <p className="my-3">
            <Text text={value.rich_text} />
          </p>
        );
      case "heading_1":
        return (
          <h1 className="text-3xl mb-6 mt-8 font-bold" id={hId}>
            <a href={`#${hId}`}><Text text={value.rich_text} /></a> 
          </h1>
        );
      case "heading_2":
        return (
          <h2 className="text-2xl mb-6 mt-8 font-bold" id={hId}>
             <a href={`#${hId}`}><Text text={value.rich_text} /></a> 
          </h2>
        );
      case "heading_3":
        return (
          <h3 className="text-xl mb-6 mt-8 font-bold" id={hId}>
             <a href={`#${hId}`}><Text text={value.rich_text} /></a> 
          </h3>
        );
      case "bulleted_list": {
        return <ul>{value.children.map((child: any) => renderBlock(child))}</ul>;
      }
      case "numbered_list": {
        return <ol>{value.children.map((child: any) => renderBlock(child))}</ol>;
      }
      case "bulleted_list_item":
      case "numbered_list_item":
        return (
          <div className="my-1 ml-1">
            <li key={block.id} >
              <Text text={value.rich_text} />
              {!!value.children && renderNestedList(block)}
            </li>
          </div>
        );
      case "to_do":
        return (
          <div className="my-1 ml-1">
            <label htmlFor={id}>
              <input type="checkbox" id={id} defaultChecked={value.checked} disabled className="mr-1"/>{" "}
              <Text text={value.rich_text} />
            </label>
          </div>
        );
      case "toggle":
        return (
          <details>
            <summary>
              <Text text={value.rich_text} />
            </summary>
            {block.children?.map((child: any) => (
              <Fragment key={child.id}>{renderBlock(child)}</Fragment>
            ))}
          </details>
        );
      case "child_page":
        return (
          <div>
            <strong>{value.title}</strong>
            {block.children.map((child: any) => renderBlock(child))}
          </div>
        );
      case "image":
        const src =
          value.type === "external" ? value.external.url : value.file.url;
        const caption = value.caption ? value.caption[0]?.plain_text : "";
        return (
          <figure className=" flex my-5 justify-center">
            <div className="flex flex-col w-full items-center">
              <Image src={src} alt={caption || 'image'}  width={400} height={400} className="w-[100%] sm:w-[60%]" priority />
              {caption && <figcaption className="text-[#696969] text-sm mt-1 w-[100%] sm:w-[60%]">{caption}</figcaption>}
            </div>
          </figure>
        );
      case "divider":
        return <hr key={id} />;
      case "quote":
        return <blockquote key={id} className="border-solid border-l-4 px-3 my-3">
          <Text text={value.rich_text} />
        </blockquote>;
      case "code":
        const { language = 'html' } = value
        return (
          <div className="my-5">
            <pre className="text-sm dark:hidden">
              <SyntaxHighlighter language={language} style={github} key={id} showLineNumbers>
                {value.rich_text[0].plain_text}
              </SyntaxHighlighter>
            </pre>
            <pre className="text-sm hidden dark:block">
              <SyntaxHighlighter language={language} style={darcula} key={id} showLineNumbers>
                {value.rich_text[0].plain_text}
              </SyntaxHighlighter>
            </pre>
          </div>
        );
      case "callout":
        return (
          <blockquote className="border-solid border-l-4 px-3 my-3">
            {value.icon.emoji}{value.rich_text[0].plain_text}
          </blockquote>
        );
      case "bookmark":
        const href = value.url;
        return (
          <Link href={href} target="_brank" >
            {href}
          </Link>
        );
      case "table": {
        return (
          <table>
            <tbody>
              {block.children?.map((child: any, i: number) => {
                const RowElement =
                  value.has_column_header && i == 0 ? "th" : "td";
                return (
                  <tr key={child.id}>
                    {child.table_row?.cells?.map((cell: any, i: number) => {
                      return (
                        <RowElement key={`${cell.plain_text}-${i}`}>
                          <Text text={cell} />
                        </RowElement>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        );
      }
      case "column_list": {
        return (
          <div>
            {block.children.map((block: any) => renderBlock(block))}
          </div>
        );
      }
      case "column": {
        return <div>{block.children.map((child: any) => renderBlock(child))}</div>;
      }
      default:
        return `❌ Unsupported block (${
          type === "unsupported" ? "unsupported by Notion API" : type
        })`;
    }
  };

  return (
    <div className='flex flex-row justify-between'>
      <article className='leading-8 w-full lg:w-[640px]'>
        {blocks.map((block :any) => (
          <Fragment key={block.id}>{renderBlock(block)}</Fragment>
        ))}
      </article>
      <div className='sticky h-fit top-14 max-w-[270px] hidden lg:block'>
        <TableOfContents />
      </div>
    </div>
  )
}