import Head from "next/head";
import styles from "./layout.module.css";
import utilStyles from "./../styles/utils.module.css";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from 'next/router'
import path from "path";
import Link from "next/link";

interface childrenNode {
  children: ReactNode;
}

const name: string = "みちょぱ";
export const siteTitle: string = "Next.js blog";
function Layout(
  { children }: childrenNode,
) {
  const router = useRouter();
  const [ home, setHome ] = useState(false);
  useEffect(() => {
    if (router.pathname === "/") {
      setHome(true);
    }
  }, [router.pathname]);

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <img
              className={`
              ${utilStyles.borderCircle}
              ${styles.headerHomeImage}
            `}
              src="/images/gyaru1.png"
              alt="13"
            />
          </>
        ) : (
          <>
            <img
              className={`
              ${utilStyles.borderCircle}
              ${styles.headerImage}
            `}
              src="/images/gyaru1.png"
              alt="13"
            />
          </>
        )}
        <h1 className={utilStyles.heading2Xl}>{name}</h1>
      </header>
      <main>{children}</main>
      {!home && (
        <Link href="/">←ホームへ戻る</Link>
      )}
    </div>
  );
}

export default Layout;