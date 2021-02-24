import { useRouter } from "next/router";

export const usePagination = ({ totalItems, itemsPerPage }) => {
  const router = useRouter();
  const currentPage = parseInt(router.query.page, 10) || 1;

  return {
    currentPage,
    isFirst: currentPage === 1,
    isLast: currentPage === Math.ceil(totalItems / itemsPerPage),
    handlePrevPage: () => {
      router.push({
        query: {
          page: currentPage - 1,
        },
      });
    },
    handleNextPage: () => {
      router.push({
        query: {
          page: currentPage + 1,
        },
      });
    },
  };
};
