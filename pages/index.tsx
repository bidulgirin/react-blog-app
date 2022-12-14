import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { getSortedPostsData } from "../lib/post";
import homeStyles from "../styles/Home.module.css";
// 객체로 props의 타입을 선언하고 있다
const Home = ({
  allPostData,
}: {
  allPostData: {
    date: string;
    title: string;
    id: string;
  }[];
}) => {
  return (
    <div className={homeStyles.wrapper}>
      <div className={homeStyles.headingMd}>
        <Head>
          <title>Nest.js 로 blog만들기</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <section className={homeStyles.main_wrap}>
          <Image src="/me.png" width={300} height={300} alt="나에용" />

          <p className={homeStyles.main_title}>안녕하세요! 이경민입니다</p>
          <p className={homeStyles.main_title_des}>
            만드는것 보다 배포가 더 어려워
          </p>
        </section>
        <section className={homeStyles.blog_style}>
          <h2>Blog</h2>
          <ul className={homeStyles.list}>
            {/* next 의 Link 를 이용해 url을 동적으로 연결할수있다 */}
            {allPostData.map(({ id, date, title }) => (
              <li className={homeStyles.listItem} key={id}>
                <Link href={`/posts/${id}`}>
                  <a className={homeStyles.blog_title}>{title}</a>
                </Link>

                <br />
                <small className={homeStyles.lightText}>{date}</small>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const allPostData = getSortedPostsData();
  return {
    props: {
      allPostData,
    },
  };
};
