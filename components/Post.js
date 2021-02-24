export const Post = ({ postData }) => (
  <li style={{ marginBottom: "80px" }}>
    <h1>{postData.title}</h1>
    <h3>{postData.userId}</h3>
    <article>{postData.body}</article>
  </li>
);
