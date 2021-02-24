import { useRouter } from "next/router";

export const Pagination = ({ currentPage, totalItems, itemsPerPage }) => {
  const router = useRouter(); // TODO: remove this and add onPageChange

  return (
    <>
      <button
        disabled={currentPage === 1}
        onClick={() => {
          router.push({
            query: {
              page: currentPage - 1,
            },
          });
        }}
      >
        PREV
      </button>
      <button
        disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
        onClick={() => {
          router.push({
            query: {
              page: currentPage + 1,
            },
          });
        }}
      >
        NEXT
      </button>
    </>
  );
};
