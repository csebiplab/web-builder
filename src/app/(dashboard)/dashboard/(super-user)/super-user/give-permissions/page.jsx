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

  return <GivePermissions roles={data?.roles} permissions={data?.permissions} />;
}
