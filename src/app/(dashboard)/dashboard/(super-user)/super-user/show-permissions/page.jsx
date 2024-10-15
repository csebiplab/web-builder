import { envConfig } from "@/lib/envConfig";
import { ShowAllPermissions } from "../../../../../../components/__dashboard/SuperUser/ShowAllPermissions/ShowAllPermissions";

export async function getData() {
  const apiUrl = envConfig.url;

  const res = await fetch(`${apiUrl}/api/permission`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data?.data;
}

export default async function page() {
  const data = await getData();

  return (
    <div className="px-8">
      <p className="text-3xl font-extrabold">All Permission Modules</p>
      <ShowAllPermissions data={data} />
    </div>
  );
}
