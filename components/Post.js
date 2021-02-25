import React from "react";
import { Button } from "../components";
import styles from "./Post.module.scss";

export const Post = ({ postData, onEdit }) => (
  <div className={styles.post}>
    <div>
      <h1 className={styles.postHeader}>{postData.title}</h1>
      <h3 className={styles.postId}>{postData.userId}</h3>
    </div>
    <article>{postData.body}</article>
    <Button className={styles.editButton} onClick={onEdit}>
      Edit
    </Button>
  </div>
);
