import React from "react";
import styles from "./UserCard.module.scss";

export const UserCard = ({ user, onClick }) => {
  return (
    <div className={styles.userCard} onClick={onClick}>
      <div className={styles.name}>{user.name}</div>
      <div className={styles.field}>User: {user.username}</div>
      <div className={styles.field}>{user.email}</div>
      <div className={styles.field}>{user.phone}</div>
      <div className={styles.field}>Website: {user.website}</div>
      <div className={styles.field}>Company: {user.company.name}</div>
    </div>
  );
};
