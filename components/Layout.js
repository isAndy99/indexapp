import React from "react";
import Link from "next/link";

export const Layout = ({ children }) => (
  <>
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <Link href="/posts">
        <a>Posts</a>
      </Link>
      <Link href="/users">
        <a>Users</a>
      </Link>
    </div>
    {children}
  </>
);
