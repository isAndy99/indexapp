import { useRouter } from "next/router";
import { Layout, UserCard, Pagination } from "../components";
import styles from "../styles/Users.module.scss";

const ITEMS_PER_PAGE = 3;

export const getServerSideProps = async ({ query }) => {
  const currentPage = Math.abs(parseInt(query.page, 10)) || 1;

  const usersResp = await fetch(
    `https://jsonplaceholder.typicode.com/users?_start=${
      ITEMS_PER_PAGE * (currentPage - 1)
    }&_limit=${ITEMS_PER_PAGE}`
  ); // TODO: handle error
  const users = await usersResp.json();

  return {
    props: {
      usersData: {
        users,
        count: usersResp.headers.get("x-total-count"),
      },
    },
  };
};

const Users = ({ usersData }) => {
  const { users, count } = usersData;

  // TODO: move to hook?
  const router = useRouter();
  const currentPage = parseInt(router.query.page, 10) || 1;

  return (
    <Layout>
      <ul className={styles.list}>
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        itemsPerPage={ITEMS_PER_PAGE}
        totalItems={count}
      />
    </Layout>
  );
};

export default Users;
