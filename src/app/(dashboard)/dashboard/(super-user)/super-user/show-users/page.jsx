import { envConfig } from "@/lib/envConfig";
import { ShowAllUsers } from "../../../../../../components/__dashboard/SuperUser/ShowAllUsers/ShowAllUsers";

async function getData() {
  const apiUrl = envConfig.url;

  const res = await fetch(`${apiUrl}/api/user`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data?.data;
}

export default async function page() {
  const data = await getData();

  return (
    <div className="px-8">
      <p className="text-3xl font-extrabold">All Users</p>
      <ShowAllUsers data={data} />
    </div>
  );
}
