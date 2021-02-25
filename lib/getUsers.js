export const getPaginatedUsers = async (page, items) => {
  const usersResp = await fetch(
    `https://jsonplaceholder.typicode.com/users?_start=${
      items * (page - 1)
    }&_limit=${items}`
  );

  const users = await usersResp.json();

  return {
    users,
    count: usersResp.headers.get("x-total-count"),
  };
};

export const getUser = async (id) => {
  const userResp = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  const userData = await userResp.json();

  return userData;
};
