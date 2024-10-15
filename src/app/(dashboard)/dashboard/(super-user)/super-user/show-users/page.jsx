import { ShowAllUsers } from "../../../../../../components/__dashboard/SuperUser/ShowAllUsers/ShowAllUsers";

export async function getData() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${apiUrl}/api/user`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data?.data;
}

export default async function page() {
    const data = await getData();


    return <div className="px-8">
        <p className="text-3xl font-extrabold">All Users</p>
        <ShowAllUsers data={data} />
    </div>
}
