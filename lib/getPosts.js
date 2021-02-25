export const getPaginatedPosts = async (page = 1, itemsPerPage = 5) => {
  const response = await fetch(
    `http://jsonplaceholder.typicode.com/posts?_start=${
      itemsPerPage * (page - 1)
    }&_limit=${itemsPerPage}`
  );
  const posts = await response.json();

  return {
    posts,
    count: response.headers.get("x-total-count"),
  };
};
