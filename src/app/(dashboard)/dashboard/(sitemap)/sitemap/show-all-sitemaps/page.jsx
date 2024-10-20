import { envConfig } from "./../../../../../../lib/envConfig";
import ShowSitemaps from "../../../../../../components/__dashboard/SitemapComponents/ShowSitemaps";
import getCurrentUser from "@/lib/session";

export async function getData(user) {
  const apiUrl = envConfig.url;

  const res = await fetch(`${apiUrl}/api/sitemap?projectFor=${user?.role}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data?.data;
}

async function page() {
  const user = await getCurrentUser();
  const data = await getData(user);

  return <ShowSitemaps data={data} />;
}

export default page;
