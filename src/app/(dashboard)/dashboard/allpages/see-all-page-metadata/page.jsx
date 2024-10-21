import { envConfig } from "@/lib/envConfig";
import ShowMetadatas from "../../../../../components/__dashboard/MetaData/ShowMetadatas/ShowMetadatas";
import getCurrentUser from "@/lib/session";

async function getData() {
  const user = await getCurrentUser();
  const apiUrl = envConfig?.url;

  const res = await fetch(`${apiUrl}/api/metadata?projectFor=${user?.role}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data?.data;
}

export default async function page() {
  const data = await getData();

  return <ShowMetadatas data={data} />;
}
