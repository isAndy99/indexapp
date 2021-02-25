import React, { useState } from "react";

export const PostForm = ({ postData, onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    title: postData.title,
    body: postData.body,
  });

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <>
      <h2>Edit Post</h2>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        onChange={handleChange}
        value={formData.title}
      />
      <br />
      <label htmlFor="body">Content</label>
      <textarea
        id="body"
        name="body"
        style={{ width: "100%", height: "70%", resize: "none" }}
        onChange={handleChange}
        value={formData.body}
      />
      <button onClick={onCancel}>Cancel</button>
      <button
        onClick={() =>
          onSave({
            id: postData.id,
            title: formData.title,
            body: formData.body,
          })
        }
      >
        Save
      </button>
    </>
  );
};
