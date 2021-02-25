import React from "react";
import style from "./UserCard.module.scss";

export const UserCard = ({ user, onClick }) => {
  return (
    <li className={style.userCard} onClick={onClick}>
      <div>{user.name}</div>
      <div>{user.email}</div>
      <div>{user.phone}</div>
      <div>{user.username}</div>
      <div>{user.website}</div>
      <div>{user.company.name}</div>
    </li>
  );
};
