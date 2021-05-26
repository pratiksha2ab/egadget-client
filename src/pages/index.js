import Head from 'next/head'
import Banner from '../components/Banner'

export default function Home() {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>NepPharm</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-screen-xl mx-auto">
        <Banner />
      </main>
    </div>
  )
}
