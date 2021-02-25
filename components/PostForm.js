import React, { useState } from "react";
import { Input, TextArea, Label } from "../components";

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
      <Label htmlFor="title">Title</Label>
      <Input
        id="title"
        name="title"
        onChange={handleChange}
        value={formData.title}
      />
      <br />
      <Label htmlFor="body">Content</Label>
      <TextArea
        id="body"
        name="body"
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
