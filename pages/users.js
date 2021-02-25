import { Layout, UserCard, Pagination, usePagination } from "../components";
import { isTokenValid, getPaginatedUsers } from "../lib";
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
  const usersData = await getPaginatedUsers(currentPage, ITEMS_PER_PAGE);

  return {
    props: {
      usersData,
    },
  };
};

const Users = ({ usersData }) => {
  const { users, count } = usersData;

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
