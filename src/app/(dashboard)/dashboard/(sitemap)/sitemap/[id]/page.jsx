import CreateSitemap from "../../../../../../components/__dashboard/SitemapComponents/CreateSitemap";
import { envConfig } from "./../../../../../../lib/envConfig";

export async function getData(id) {
  const res = await fetch(`${envConfig?.url}/api/sitemap/${id}`, {
    cache: "no-store",
  });
  const { data } = await res.json();
  return data;
}

const page = async ({ params }) => {
  const { id } = params;

  const data = await getData(id);

  return (
    <>
      <CreateSitemap data={data} />
    </>
  );
};

export default page;
