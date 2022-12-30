import Head from "next/head";
import Layout from "../../components/Layout";
import { getAllPostsIds, getPostData } from "../../lib/post";
import utilStyles from "./../../styles/utils.module.css";

export async function getStaticPaths() {
  const paths = getAllPostsIds();

  return {
    paths,
    fallback:false,
  }
}

export async function getStaticProps({ params }: Params) {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    }
  }
}

type Params = {
  params: {
    id: string
  }
}

type PostData = {
  postData: {
    id: string,
    blogContentHTML: string,
    title: string,
    date: string,
  }
}

export default function Post({postData}: PostData) {
  return (
    <Layout>
      <Head>
        <title>{ postData.title }</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingX1}>
          {postData.title}
        </h1>
        <div className={utilStyles.lightText}>
          {postData.date}
        </div>
        <div
          dangerouslySetInnerHTML=
          {{ __html: postData.blogContentHTML }}
        />
      </article>
    </Layout>
  );
}