import AssignRole from "../../../../../../components/__dashboard/SuperUser/AssignRole/AssignRole";
import { envConfig } from "@/lib/envConfig";

async function getData() {
  const apiUrl = envConfig.url;
  const res = await fetch(`${apiUrl}/api/dropdown?type=roles-and-users`, {
     cache: "no-store",
  });
  const data = await res.json();
  return data?.data;
}

export default async function page() {
  const data = await getData();

  const apiUrl = envConfig.url;

  const endpoint = "/api/user-role";
   const postUrl = apiUrl + endpoint;
  //  const fetchUrl = `${apiUrl}/api/dropdown/roles-and-users`;


  // return <AssignRole fetchUrl={fetchUrl} url={postUrl} />;
  return <AssignRole users={data?.users} roles={data?.roles} url={postUrl} />;
}
