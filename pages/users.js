import { useRouter } from "next/router";
import { Layout, UserCard, Pagination, usePagination } from "../components";
import { isTokenValid } from "../lib";
import styles from "../styles/Users.module.scss";

const ITEMS_PER_PAGE = 3;

export const getServerSideProps = async ({ req, query }) => {
  if (!isTokenValid(req)) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

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
  const router = useRouter();

  const { isFirst, isLast, handlePrevPage, handleNextPage } = usePagination({
    totalItems: count,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  return (
    <Layout>
      <ul className={styles.list}>
        {users.map((user) => (
          <UserCard key={user.id} onEdit={() => {}} user={user} />
        ))}
      </ul>
      <Pagination
        onPrev={handlePrevPage}
        onNext={handleNextPage}
        isFirst={isFirst}
        isLast={isLast}
      />
    </Layout>
  );
};

export default Users;
