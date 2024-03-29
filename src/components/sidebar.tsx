'use client'

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutGroup } from 'framer-motion';
import cx from 'classnames';

const navItems = {
  '/': {
    name: 'Home',
  },
  '/blog': {
    name: 'Blog',
  },
  '/about': {
    name: 'About',
  },
};


export default function Navbar() {
  let pathname = usePathname() || '/';
  if (pathname.includes('/blog/')) {
    pathname = '/blog';
  }

  return (
    <aside className="md:w-[150px] md:flex-shrink-0 -mx-4 md:mx-0 md:px-0 font-serif">
      <div className="lg:sticky lg:top-20">
        <LayoutGroup>
          <nav
            className="flex flex-row md:flex-col mb-3 items-start relative px-4 md:px-0 pb-0 fade"
            id="nav"
          >
            <div className="flex flex-row md:flex-col space-x-0 mb-2 mt-2 md:mt-0 ">
              {Object.entries(navItems).map(([path, { name }]) => {
                const isActive = path === pathname;
                return (
                  <Link
                    key={path}
                    href={path}
                    className={ cx('transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle',{
                      'text-neutral-500': !isActive,
                      'font-bold': isActive,
                    })}
                  >
                    <span className={cx('relative py-[5px] px-[10px]',{
                      'bg-neutral-100 dark:bg-neutral-800 rounded-md': isActive,
                    })}>
                      {name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </nav>
        </LayoutGroup>
      </div>
    </aside>
  );
}
