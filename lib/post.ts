import fs from "fs";
import path from "path";
// md로 되어있는 파일을 데이터(객체)로 만들어 주는 모듈
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

//경로 설정 (./posts/ ~ .md) 있는곳 가져옴
const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  // /posts 파일 이름 잡아주기
  const fileNames = fs.readdirSync(postsDirectory);
  // ['pre-rendering.md', ...]
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, ""); // /\.md$/ 는 어떤식으로 동작하는가
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf-8");
    const matterResult = matter(fileContents);

    return {
      id,
      ...(matterResult.data as { date: string; title: string }),
    };
  });
  //sorting
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
        // fileName 에서 .md 라고 되어있는 부분 공백으로 바꾸겠다
      },
    };
  });
}

//await 를 쓰려면 async
export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...(matterResult.data as {
      date: string;
      title: string;
    }),
  };
}
