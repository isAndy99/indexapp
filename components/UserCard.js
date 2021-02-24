import style from "./UserCard.module.scss";

export const UserCard = ({ user }) => {
  return (
    <div className={style.userCard}>
      <div>{user.name}</div>
      <div>{user.email}</div>
      <div>{user.phone}</div>
      <div>{user.username}</div>
      <div>{user.website}</div>
      <div>{user.company.name}</div>
    </div>
  );
};
