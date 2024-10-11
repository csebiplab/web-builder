import BlogList from "@/components/__dashboard/BlogComponents/BlogList";

export async function getData() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${apiUrl}/api/blog`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data?.data;
}

export default async function page() {
  const blogs = await getData();

  return (
    <div>
      <BlogList allBlogList={blogs} />
    </div>
  );
}
