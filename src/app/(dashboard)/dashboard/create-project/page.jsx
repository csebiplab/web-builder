import getCurrentUser from "@/lib/session";
import ProjectDetailsForm from "../../../../components/__dashboard/ProjectDetails/ProjectDetailsForm";

export default async function page() {
  const user = await getCurrentUser();

  
  return (
    <div>
      <ProjectDetailsForm projectFor={user?.role} />
    </div>
  );
}
