import getCurrentUser from "@/lib/session";
import UserAccountNav from "./UserAccountNav";
import { cn } from "@/lib/utils";
import DynamicDashboardHeaderTitle from "./__dashboard_ui/DynamicDashboardHeader";

export default async function DashboardHeader({ className, ...props }) {
  const user = await getCurrentUser();

  return (
    <header
      className={cn(
        "w-full sticky top-0 z-50 px-5 py-4 bg-dark gap-2 backdrop-blur-sm flex flex-row justify-between items-center",
        className
      )}
      {...props}
    >
      <DynamicDashboardHeaderTitle />
      {user && <UserAccountNav user={user} />}
    </header>
  );
}
