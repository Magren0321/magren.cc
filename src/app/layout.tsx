import './globals.css'
import Sidebar from '../components/sidebar'
import NextTopLoader from 'nextjs-toploader'

export const metadata = {
  title: "Magren's Blog"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-Hans" className='text-black bg-white dark:text-white dark:bg-[#111010]'>
      <body className='antialiased max-w-4xl mb-40 flex flex-col md:flex-row mx-4 mt-8 md:mt-20 lg:mt-32 lg:mx-auto'>
      <div className='dark:hidden'>
        <NextTopLoader 
          color="#000000"
          initialPosition={0.08}
          crawlSpeed={200}
          height={2}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
        />
      </div>
      <div className='hidden dark:block'>
        <NextTopLoader 
          color="#fff"
          initialPosition={0.08}
          crawlSpeed={200}
          height={2}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
        />
      </div>
      <Sidebar />
        <main className='flex-auto min-w-0 mt-6 md:mt-0 flex flex-col px-2 md:px-0'>
          {children}
        </main>
      </body>
    </html>
  )
}
