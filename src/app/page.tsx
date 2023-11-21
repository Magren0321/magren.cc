"use client"

import Avatar from '@/components/Avatar';
import SocialList from '@/components/SocialList';
import { About, Technology  } from '@/lib/info';

export default function Home() {
  return (
    <main>
      <div className="flex items-center bg-[#EEE] p-5 rounded-xl max-w-md dark:bg-[#444]">
        <Avatar/>
        <div className='flex flex-col ml-5 font-bold'>
          <div><i className='mr-1'>Hello</i>👋</div>
          <div><i className='mr-1'>I&apos;m Magren</i>🦊</div>
        </div>
      </div>
      <div className='mt-5'>
        <SocialList />
      </div>
      <div className='mt-5'>
      <h2 className='font-bold text-xl'>🌟 About me</h2>
        <About />
      </div>
      <div className='mt-5'>
        <h2 className='font-bold text-xl'>💻 Skills and tools</h2>
        <div className='mt-5'>
          <Technology />
        </div>
      </div>
    </main>
  )
}
