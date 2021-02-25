import { useRouter } from "next/router";
import Cookies from "js-cookie";

export const useLogout = () => {
  const router = useRouter();

  return {
    logout: () => {
      Cookies.remove("token");
      router.push("/login");
    },
  };
};
