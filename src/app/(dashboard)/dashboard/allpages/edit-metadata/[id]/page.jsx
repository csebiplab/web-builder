import CreateAndUpdateFormForPageMeta from "@/components/__dashboard/MetaData/CreateAndUpdateFormForPageMeta/CreateAndUpdateFormForPageMeta";
import { envConfig } from "@/lib/envConfig";


export async function getData(id) {

    const response = await fetch(`${envConfig?.url}/api/metadata/${id}`, {
        cache: "no-store",
    });
    const data = await response.json();
    return data?.data;
}


const page = async ({ params }) => {
    const { id } = params;
    const data = await getData(id);

    return (
      <>
        <CreateAndUpdateFormForPageMeta metaData={data} />
      </>
    );
};

export default page;

