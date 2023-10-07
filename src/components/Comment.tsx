'use client';
import Giscus from '@giscus/react';

export default function Comment() {
  return (
    <div className='mt-10'>
      <Giscus
        id="comments"
        repo="Magren0321/magren.cc"
        repoId="R_kgDOJbpX2Q"
        category="Announcements"
        categoryId="DIC_kwDOJbpX2c4CZ7zi"
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        lang="en"
        theme="preferred_color_scheme"
        loading="lazy"
      />
    </div>
  );
}
