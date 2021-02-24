import { useEffect, useReducer, useState } from "react";
import { Layout, Post, Pagination, Modal, usePagination } from "../components";
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

const reducer = (state, { type, payload }) => {
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

  const [posts, setPosts] = useReducer(reducer, []);
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
            onEdit={(id) => () => {
              setShowModal(true);
              setEditedPostId(id);
            }}
          />
        ))}
      </div>
      <Modal isOpen={showModal}>
        <div style={{ width: "500px", height: "500px", background: "white" }}>
          <ModalContent
            postData={posts.find(({ id }) => editedPostId === id)}
            onCancel={() => {
              setShowModal(false);
              setEditedPostId(null);
            }}
            onSave={(payload) => () => {
              setPosts({ type: "EDIT_POST", payload });
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

const ModalContent = ({ postData, onCancel, onSave }) => {
  const [title, setTitle] = useState(postData.title);
  const [body, setBody] = useState(postData.body);

  return (
    <>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <textarea
        style={{ width: "100%", height: "70%", resize: "none" }}
        onChange={(e) => setBody(e.target.value)}
        value={body}
      />
      <button onClick={onCancel}>Cancel</button>
      <button onClick={onSave({ id: postData.id, title, body })}>Save</button>
    </>
  );
};
