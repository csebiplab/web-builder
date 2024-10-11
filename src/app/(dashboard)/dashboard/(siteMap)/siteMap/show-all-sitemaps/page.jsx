import ShowSitemaps from "../../../../../../components/__dashboard/SitemapComponents/ShowSitemaps";

export async function getData() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${apiUrl}/api/sitemap`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data?.data;
}

const page = async () => {
  const sitemaps = await getData();

  return <ShowSitemaps data={sitemaps} />;
};

export default page;
