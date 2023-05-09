"use client"

import Avatar from '@/components/Avatar';
import { About, Technology , WakaTime } from '@/lib/info';

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
      <h2 className='font-bold'>🌟 About me</h2>
        <About />
      </div>
      <div className='mt-5'>
        <h2 className='font-bold'>💻 I can...</h2>
        <div className='flex flex-wrap space-x-2 space-y-1'>
          <Technology />
        </div>
      </div>
      <div className='mt-5'>
        <h2 className='font-bold mb-1'>⏱️ Since February 5th, 2022, I have been coding for...</h2>
        <div className='ml-1'><WakaTime/></div>
      </div>
      <div className='mt-5'>
        <h2 className='font-bold'>📝 Find me</h2>
        <ul className='list-disc ml-5 mt-1'>
          <li>Github:<a href="https://github.com/Magren0321" className='ml-1 underline' target='_bank'>Magren0321</a></li>
          <li>Twitter:<a href="https://twitter.com/Magren_lin" className='ml-1 underline' target='_bank'>Magren</a></li>
          <li>Telegram:<a href="https://t.me/Magren_lin" className='ml-1 underline' target='_bank'>Magren</a></li>
          <li>E-mail:<a href="mailto:zhuhenglin21@gmail.com" className='ml-1 underline'>zhuhenglin21@gmail.com</a></li>
          <li>Nintendo FC: SW-1418-2466-9500</li>
        </ul>
      </div>
    </main>
  )
}
