import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import cn from "classnames";

import { useLogout } from "./hooks";

import styles from "./Layout.module.scss";

export const Layout = ({ children }) => {
  const { logout } = useLogout();
  const router = useRouter();
  return (
    <>
      <header className={styles.header}>
        <div className={styles.navigation}>
          <Link href="/posts">
            <a
              className={cn(styles.headerLink, {
                [styles.active]: router.pathname.includes("posts"),
              })}
            >
              Posts
            </a>
          </Link>
          <Link href="/users">
            <a
              className={cn(styles.headerLink, {
                [styles.active]: router.pathname.includes("users"),
              })}
            >
              Users
            </a>
          </Link>
        </div>
        <a className={styles.logoutLink} onClick={logout}>
          Logout
        </a>
      </header>
      {children}
    </>
  );
};
