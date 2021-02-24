import { useRouter } from "next/router";
import { Layout, Post, Pagination } from "../components";
import { isTokenValid } from "../utils";

const ITEMS_PER_PAGE = 5;

export const getServerSideProps = async ({ req, query }) => {
  if (!isTokenValid(req)) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  const currentPage = Math.abs(parseInt(query.page, 10)) || 1;

  const postsResp = await fetch(
    `http://jsonplaceholder.typicode.com/posts?_start=${
      ITEMS_PER_PAGE * (currentPage - 1)
    }&_limit=${ITEMS_PER_PAGE}`
  ); // TODO: handle error
  const posts = await postsResp.json();

  return {
    props: {
      postsData: {
        posts,
        count: postsResp.headers.get("x-total-count"),
      },
    },
  };
};

const Posts = ({ postsData }) => {
  const { posts, count } = postsData;

  // TODO: move to hook?
  const router = useRouter();
  const currentPage = parseInt(router.query.page, 10) || 1;

  return (
    <Layout>
      <div style={{ listStyle: "none" }}>
        {posts.map((post) => (
          <Post key={post.id} postData={post} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        itemsPerPage={ITEMS_PER_PAGE}
        totalItems={count}
      />
    </Layout>
  );
};

export default Posts;
