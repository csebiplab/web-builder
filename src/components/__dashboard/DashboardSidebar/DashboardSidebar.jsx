import { dashboardConfig } from "@/constants/dashboard/dashboard.constants";
import { DashboardSidebarMenuItem } from "./DashboardSidebarMenuItem";
import getCurrentUser from "@/lib/session";

export async function DashboardSidebar() {
  const user = await getCurrentUser();

  let permissableMenus = dashboardConfig.sidebarNav;
  if (user?.role !== "Super Admin") {
    permissableMenus = dashboardConfig.sidebarNav.filter((item) =>
      user?.permissions?.includes(item?.permissionName)
    );
  }

  return (
    <div className="flex flex-col gap-5 h-full">
      <h1 className="font-medium text-lg">Admin Dashboard</h1>
      <nav className="flex flex-col flex-1 gap-2">
        {permissableMenus?.length > 0 &&
          permissableMenus.map((item, i = 1) => {
            return (
              <div key={i + 1}>
                <DashboardSidebarMenuItem item={item} />
              </div>
            );
          })}
      </nav>
    </div>
  );
}
