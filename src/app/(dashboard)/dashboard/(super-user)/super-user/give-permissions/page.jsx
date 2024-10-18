import { envConfig } from "@/lib/envConfig";
import GivePermissions from "../../../../../../components/__dashboard/SuperUser/GivePermissions/GivePermissions";

export async function getData() {
  const apiUrl = envConfig.url;
  const res = await fetch(`${apiUrl}/api/dropdown/role-nd-permissions`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data?.data;
}

export default async function page() {
  const data = await getData();

  const apiUrl = envConfig.url;

  const endpoint = "/api/role-permission";
  const url = apiUrl + endpoint;

  return (
    <GivePermissions roles={data?.roles} permissions={data?.permissions} url={url} />
  );
}
