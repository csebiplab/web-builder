import  getCurrentUser  from "@/lib/session";
import { envConfig } from "./../../../../../../lib/envConfig";
import BlogList from "@/components/__dashboard/BlogComponents/BlogList";

export async function getData(user) {

  const res = await fetch(`${envConfig.url}/api/blogs?projectFor=${user?.role}`, {
    cache: "no-store",
  });
  const data = await res.json();

  return data?.data;
}

export default async function page() {
  const user = await getCurrentUser()
  const data = await getData(user);

  return (
    <div>
      <BlogList data={data} />
    </div>
  );
}
