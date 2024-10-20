import getCurrentUser from "@/lib/session";
import CreateSitemap from "../../../../../components/__dashboard/SitemapComponents/CreateSitemap";

export default async function page() {
  const user = await getCurrentUser();

  return (
    <>
      <CreateSitemap user={user} />
    </>
  );
}
