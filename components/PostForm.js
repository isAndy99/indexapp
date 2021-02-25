import React, { useState } from "react";
import { TextArea, Label, Button, InputField } from "../components";

import styles from "./PostForm.module.scss";

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
    <div className={styles.container}>
      <h2 className={styles.header}>Edit Post</h2>
      <div className={styles.content}>
        <InputField
          id="title"
          name="title"
          label="Title"
          onChange={handleChange}
          value={formData.title}
        />
        <Label htmlFor="body">Content</Label>
        <TextArea
          id="body"
          name="body"
          onChange={handleChange}
          value={formData.body}
        />
      </div>
      <div className={styles.footer}>
        <Button onClick={onCancel}>Cancel</Button>
        <Button
          onClick={() =>
            onSave({
              id: postData.id,
              title: formData.title,
              body: formData.body,
            })
          }
        >
          Save
        </Button>
      </div>
    </div>
  );
};
