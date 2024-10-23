import CreateBlog from "../../../../../../components/__dashboard/BlogComponents/CreateBlog/CreateBlog";
import { getCurrentUser } from "@/lib/session";

const page = async () => {
  const user = await getCurrentUser();

  return (
    <div>
      <CreateBlog user={user} />
    </div>
  );
};
export default page;
