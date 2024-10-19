import getCurrentUser from "@/lib/session";
import CreateAndUpdateFormForPageMeta from "../../../../../components/__dashboard/MetaData/CreateAndUpdateFormForPageMeta/CreateAndUpdateFormForPageMeta";

const page = async () => {
  const user = await getCurrentUser();

  return <CreateAndUpdateFormForPageMeta user={user} />;
};

export default page;
