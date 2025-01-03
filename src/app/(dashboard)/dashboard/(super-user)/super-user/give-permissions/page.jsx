import { envConfig } from "@/lib/envConfig";
import GivePermissions from "../../../../../../components/__dashboard/SuperUser/GivePermissions/GivePermissions";

async function getData() {
  const apiUrl = envConfig.url;
  const res = await fetch(`${apiUrl}/api/dropdown?type=roles-and-permissions`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data?.data;
}

export default async function page() {
  const data = await getData();
  

  const apiUrl = envConfig.url;

  const endpoint = "/api/role-permission";
  const postUrl = apiUrl + endpoint;
  
  // const fetchUrl = `${apiUrl}/api/dropdown/role-nd-permissions`;

  // return <GivePermissions fetchUrl={fetchUrl} url={postUrl} />;
  return <GivePermissions roles={data?.roles} permissions={data?.permissions} url={postUrl} />;
}
