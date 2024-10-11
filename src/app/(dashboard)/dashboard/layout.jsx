import DashboardShell from "@/components/__dashboard/DashboardShell";
import DashboardHeader from "@/components/__dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/__dashboard/DashboardSidebar/DashboardSidebar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../globals.css";

export default async function DashboardLayout({ children }) {
  return (
    <html>
      <body>
        <div className="flex flex-row p-3 gap-3 h-screen">
          <aside
            className="max-h-screen w-60 p-5 bg-gray-3 border border-gray-2
      rounded-lg sticky top-0 max-md:hidden overflow-scroll"
          >
            <DashboardSidebar />
          </aside>
          <main className="flex-1 bg-gray-3 border border-gray-2  rounded-lg  max-h-screen overflow-auto pb-5 ">
            <DashboardShell>
              <DashboardHeader title={"Admin Profile"} />
              {children}
            </DashboardShell>
          </main>
          <ToastContainer />
        </div>
      </body>
    </html>
  );
}
