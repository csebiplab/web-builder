// import getCurrentUser from "@/lib/session";
import "../globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default async function AuthLayout({ children }) {
  // const user = await getCurrentUser();
  // console.log(user, "current user");

  return (
    <html>
      <body>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
