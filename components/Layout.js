import React from "react";
import Link from "next/link";

import { useLogout } from "./hooks";

export const Layout = ({ children }) => {
  const { logout } = useLogout();

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Link href="/posts">
          <a>Posts</a>
        </Link>
        <Link href="/users">
          <a>Users</a>
        </Link>
        <button onClick={logout}>Logout</button>
      </div>
      {children}
    </>
  );
};
