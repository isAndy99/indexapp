import { useEffect, useReducer, useState } from "react";
import {
  Layout,
  Post,
  Modal,
  PostForm,
  Pagination,
  usePagination,
} from "../components";
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
  );
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

const postsReducer = (state, { type, payload }) => {
  switch (type) {
    case "UPDATE_POSTS":
      return payload;
    case "EDIT_POST":
      const updatedIndex = state.findIndex(({ id }) => id === payload.id);
      const postData = state[updatedIndex];

      return [
        ...state.slice(0, updatedIndex),
        {
          ...postData,
          ...payload,
        },
        ...state.slice(updatedIndex + 1),
      ];

    default:
      break;
  }
};

const Posts = ({ postsData }) => {
  const { posts: postList, count } = postsData;

  const [posts, setPosts] = useReducer(postsReducer, []);
  const [showModal, setShowModal] = useState(false);
  const [editedPostId, setEditedPostId] = useState(null);

  const { isFirst, isLast, handlePrevPage, handleNextPage } = usePagination({
    totalItems: count,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  useEffect(() => {
    setPosts({ type: "UPDATE_POSTS", payload: postList });
  }, [postList]);

  return (
    <Layout>
      <div style={{ listStyle: "none" }}>
        {posts.map((post) => (
          <Post
            key={post.id}
            postData={post}
            onEdit={() => {
              setShowModal(true);
              setEditedPostId(post.id);
            }}
          />
        ))}
      </div>
      <Modal isOpen={showModal}>
        <div style={{ width: "500px", height: "500px", background: "white" }}>
          <PostForm
            postData={posts.find(({ id }) => editedPostId === id)}
            onCancel={() => {
              setShowModal(false);
              setEditedPostId(null);
            }}
            onSave={(payload) => {
              setPosts({ type: "EDIT_POST", payload });
              setEditedPostId(null);
              setShowModal(false);
            }}
          />
        </div>
      </Modal>
      <Pagination
        onPrev={handlePrevPage}
        onNext={handleNextPage}
        isFirst={isFirst}
        isLast={isLast}
      />
    </Layout>
  );
};

export default Posts;
