import { Layout, UserCard } from "../components";
import styles from "../styles/Users.module.scss";

export const getServerSideProps = async () => {
  const usersResp = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await usersResp.json();

  return {
    props: {
      users,
    },
  };
};

const Users = ({ users }) => {
  return (
    <Layout>
      <div className={styles.container}>
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </Layout>
  );
};

export default Users;
