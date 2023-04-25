// import '@/styles/globals.css'
// import SideBar from '@/components/SideBar'


// export default async function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body>
//         <div>
//         <div className='fixed right-0 top-0 h-full w-1/5 bg-gray-200'>
//           <SideBar />
//           </div>

//           <div className='bg-[#343541] flex-1'>{children}</div>
//           </div>

//         </body>
//     </html>
    
//   )
// }


// import Head from 'next/head';

// const name = 'Your Name';
// export const siteTitle = 'Next.js Sample Website';

// export default function Layout({ children, home }) {
//   return (
//     <div className={styles.container}>
//       <Head>
//         <link rel="icon" href="/favicon.ico" />
//         <meta
//           name="description"
//           content="Learn how to build a personal website using Next.js"
//         />
//         <meta
//           property="og:image"
//           content={`https://og-image.vercel.app/${encodeURI(
//             siteTitle,
//           )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
//         />
//         <meta name="og:title" content={siteTitle} />
//         <meta name="twitter:card" content="summary_large_image" />
//       </Head>
//       <header className={styles.header}>
//         {home ? (
//           <>
//             <Image
//               priority
//               src="/images/profile.jpg"
//               className={utilStyles.borderCircle}
//               height={144}
//               width={144}
//               alt=""
//             />
//             <h1 className={utilStyles.heading2Xl}>{name}</h1>
//           </>
//         ) : (
//           <>
//             <Link href="/">
//               <Image
//                 priority
//                 src="/images/profile.jpg"
//                 className={utilStyles.borderCircle}
//                 height={108}
//                 width={108}
//                 alt=""
//               />
//             </Link>
//             <h2 className={utilStyles.headingLg}>
//               <Link href="/" className={utilStyles.colorInherit}>
//                 {name}
//               </Link>
//             </h2>
//           </>
//         )}
//       </header>
//       <main>{children}</main>
//       {!home && (
//         <div className={styles.backToHome}>
//           <Link href="/">← Back to home</Link>
//         </div>
//       )}
//     </div>
//   );
// }