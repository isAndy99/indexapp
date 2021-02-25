import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { isTokenValid } from "../lib";

export const getServerSideProps = async ({ req }) => {
  if (!isTokenValid(req)) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  return {
    props: {},
  };
};

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>IndexApp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Link href="/users">
          <a className={styles.title}>Users</a>
        </Link>
        <Link href="/posts">
          <a className={styles.title}>Posts</a>
        </Link>
      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer> */}
    </div>
  );
}
