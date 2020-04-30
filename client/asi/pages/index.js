import Head from 'next/head'
import Layout from "../components/layout"

export default function Home() {
  return (
    <Layout>

      <Head>
        <title>ASI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="home-banner">
        <h1> Share Your Food</h1>
        <h3> Explore food, store food and learn more about food</h3>
        <input placeholder="search food" />
      </div>

      <main>
      </main>

      <footer>

      </footer>
    </Layout>
  )
}
