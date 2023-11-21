import React from "react"
import Link, { type LinkProps } from 'next/link'
import {
  AtomIcon,
  BilibiliIcon,
  GitHubIcon,
  type IconProps,
  MailIcon,
  TelegramIcon,
  TwitterIcon,
} from '@/assets'

const socials = [
  {
    icon: GitHubIcon,
    href: 'https://github.com/Magren0321',
    alt: 'GitHub',
  },{
    icon: TwitterIcon,
    href: 'https://twitter.com/Magren_lin',
    alt: 'Twitter',
  },{
    icon: MailIcon,
    href: 'mailto:zhuhenglin21@gmail.com',
    alt: 'Mail',
  },{
    icon: TelegramIcon,
    href: 'https://t.me/Magren_lin',
    alt: 'Telegram',
  },{
    icon: BilibiliIcon,
    href: 'https://space.bilibili.com/12031307',
    alt: 'Bilibili',
  },{
    icon: AtomIcon,
    href: 'https://magren.cc/feed.xml',
    alt: 'RSS',
  }
]

export default function SocialList() {
  return (
    <div className="flex flex-row space-x-5">
      {
        socials.map((social, index) => {
          return (
            <Link href={social.href} key={social.alt}>
              <social.icon className='w-5 h-5 text-zinc-400 transition hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'/>
            </Link>
          )
        })
      }
    </div>
  )
}
