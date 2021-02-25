import { useRouter } from "next/router";
import Head from "next/head";
import { Layout, UserCard, Pagination, usePagination } from "../components";
import { isTokenValid, getPaginatedUsers } from "../lib";
import styles from "../styles/Users.module.scss";

const ITEMS_PER_PAGE = 4;

export const getServerSideProps = async ({ req, query }) => {
  if (!isTokenValid(req)) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  const currentPage = parseInt(query.page, 10) || 1;
  const usersData = await getPaginatedUsers(currentPage, ITEMS_PER_PAGE);

  return {
    props: {
      usersData,
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
      <Head>
        <title>Users</title>
      </Head>
      <div className={styles.list}>
        {users.map((user) => (
          <UserCard
            key={user.id}
            onClick={() => router.push(`/user/${user.id}`)}
            user={user}
          />
        ))}
      </div>
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
