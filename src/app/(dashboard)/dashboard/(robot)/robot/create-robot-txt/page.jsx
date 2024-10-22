import getCurrentUser from "@/lib/session";
import CreateRobot from "../../../../../../components/__dashboard/Robots/CreateRobot/page";

export default async function page() {
  const user = await getCurrentUser();

  return <CreateRobot user={user} />;
}
