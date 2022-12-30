import Head from 'next/head';
import Link from 'next/link'
import Layout, { siteTitle } from '../components/Layout'
import { getPostsData } from '../lib/post';
import styles from "./../styles/Home.module.css";
import utilStyles from "./../styles/utils.module.css"

interface PostData {
  id: string;
  title: string;
  date: string;
  thumbnail: string;
}[]

// SSGの場合
export async function getStaticProps() {
  const allPostsData = getPostsData(); // id, title, date, thumbnail

  return {
    props: {
      allPostsData
    }
  }
}

// // SSRの場合
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       // コンポ年とに渡すためのprops
//     }
//   }
// }

export default function Home(props: {allPostsData: PostData[]}) {
  return (
    <Layout>
      <Head>
        <title>{ siteTitle }</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          みちょぱのフルスタックエンジニアへの道
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2>📝エンジニアのブログ</h2>
        <div className={styles.grid}>
          {props.allPostsData.map((data) => (
            
            <article key={data.id}>
              <Link href={`/posts/${data.id}`}>
                <img
                  src={`${data.thumbnail}`}
                  alt=""
                  className={styles.thumbnailImage}
                />
              </Link>
              <Link href={`/posts/${data.id}`}>
                <a className={utilStyles.boldText}>{data.title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                {data.date}
              </small>
            </article>

          ))}
        </div>
      </section>
    </Layout>
  )
}
