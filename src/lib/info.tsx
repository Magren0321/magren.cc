import Image from "next/image"

export const About = () =>{
  return (
    <>
      <p className='mt-1'>I&apos;m a Software Development Engineer(Mainly in the front end direction). & Open Source enthusiast and I currently work 
      at <a className="font-bold underline" target='_blank' href="https://github.com/XiaoMi">XiaoMi</a>. My personal projects and learning materials are all on 
      my <a className="font-bold underline" target='_blank' href="https://github.com/Magren0321">Github</a> or 
      my <a className="font-bold underline" target='_blank' href="https://magren.cc/">blog</a>.</p>
      <p className='mt-2'>I was born in the millennium, and I enjoy making useless and uninteresting toys using code.
      In my spare time, besides coding, I also enjoy playing games, and I&apos;m a fan of Nintendo. 
      I like the Zelda, Mario, and Pokemon series.</p>
      <p className='mt-2'>I want to be an interesting person and I have an unrealistic ideal,
       which is that I can make the world a better place with code.</p>
      <i className='mt-2 font-bold flex'>Love coding, love my girlfriend and my cat.</i>
    </>
  )
}

export const Technology = () =>{
  return(
    <>
      <Image src='/technology.svg' alt='technology' width={500} height={500} className="w-[100%]" priority />
    </>
  )
}

