import CreateSitemap from "../../../../../../components/__dashboard/SitemapComponents/CreateSitemap";

export async function getData(id) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${apiUrl}/api/sitemap/${id}`, {
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
