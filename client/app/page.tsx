import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default async function Home() {
  const router: AppRouterInstance= useRouter();
  useEffect(() => {
    getUser(router);
  }, []);

  return (
    <div className="">
      hello world
    </div>
  );
}


const getUser = async (router: AppRouterInstance) => {
  let user = sessionStorage.getItem("user");
  if (!user) {
    router.push("/login");
    // try {
    //   const res = await fetch("/api/user");
    //   const user = await res.json();
    //   sessionStorage.setItem("user", JSON.stringify(user));
    //   return user;
    // } catch (error) {
    //   console.error(error);
    // }
  } else {
    return JSON.parse(user);
  }
};
