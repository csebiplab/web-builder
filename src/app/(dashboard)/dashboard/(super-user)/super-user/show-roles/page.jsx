import { envConfig } from "@/lib/envConfig";
import { ShowAllRoles } from "../../../../../../components/__dashboard/SuperUser/ShowAllRoles/ShowAllRoles";

export async function getData() {
  const apiUrl = envConfig.url;

  const res = await fetch(`${apiUrl}/api/role`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data?.data;
}

export default async function page() {
  const data = await getData();

  return (
    <div className="px-8">
      <p className="text-3xl font-extrabold">All Roles</p>
      <ShowAllRoles data={data} />
    </div>
  );
}
