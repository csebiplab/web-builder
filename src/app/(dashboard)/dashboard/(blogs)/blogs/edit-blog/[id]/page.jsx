import Link from "next/link";
import  getCurrentUser  from "@/lib/session";
import CreateBlog from "./../../../../../../../components/__dashboard/BlogComponents/CreateBlog/CreateBlog";
import { envConfig } from "@/lib/envConfig";

export async function getData(id){
  try {
    const res = await fetch(`${envConfig.url}/api/blogs/${id}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data?.data
  } catch (error) {
    console.log(error);
  }
};

const page = async({ params }) => {
  const user = await getCurrentUser();
  const { id } = params ?? {};
  const blog = await getData(id);


  return (
    <>
      <>
        {blog?.customLink && (
          <p className="text-4xl ml-3">
            <span className="font-extrabold">Link:</span>
            <Link
              href={blog?.customLink}
              className="text-primary-50 text-2xl underline"
            >
              {blog?.customLink}
            </Link>
          </p>
        )}
      </>

      <CreateBlog id={id} data={blog} user={user} />
    </>
  );
}

export default page;
