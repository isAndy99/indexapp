import React, { useState } from "react";

export const PostForm = ({ postData, onCancel, onSave }) => {
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
      <button onClick={() => onSave({ id: postData.id, title, body })}>
        Save
      </button>
    </>
  );
};
