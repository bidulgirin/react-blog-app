import type { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import React from "react";
import { getAllPostIds, getPostData, getSortedPostsData } from "../../lib/post";
import homeStyles from "../../styles/Home.module.css";

const Post = ({
  postData,
}: {
  postData: {
    title: string;
    date: string;
    contentHtml: string;
  };
}) => {
  return (
    <div>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article className={homeStyles.blog_inner_background}>
        <h1 className={homeStyles.headingXl}>{postData.title}</h1>
        <div className={homeStyles.lightText}>{postData.date}</div>
        <div
          className={homeStyles.blog_contents}
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </article>
    </div>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  //console.log("paths", paths);
  // [ { parmas : {id:'pre-rendering'}, { params: {id: 'ssg-ssr'} } ]
  return {
    paths,
    fallback: false,
    // false라면 getStaticPaths로 리턴되지 않는 것은 모두 404 페이지가뜸
    // true 라면 getStaticPath 로 리턴되지 않는 것은 404로 뜨지 않고 fallback페이지가 뜸
  };
};

// md 폴더 안에있는 데이터를 가져온다
// 위 코드에서 params를 가져왔으니까 꺼내주는거임
export const getStaticProps = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  console.log("params", params);
  const postData = await getPostData(params.id as string);
  return {
    props: {
      postData,
    },
  };
};
