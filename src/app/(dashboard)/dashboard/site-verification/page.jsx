import getCurrentUser from "@/lib/session";
import SiteverificationCreateNdShow from "../../../../components/__dashboard/Siteverification/SiteverificationCreateNdShow";
import { envConfig } from "@/lib/envConfig";

export async function getData(user) {
  const apiUrl = envConfig.url;

  const res = await fetch(`${apiUrl}/api/site-verification?${user?.role}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data?.data;
}

export default async function page() {
  const user = await getCurrentUser();
  const data = await getData(user);

  return (
    <>
      <SiteverificationCreateNdShow data={data} user={user} />
    </>
  );
}
