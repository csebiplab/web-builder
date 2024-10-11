import getCurrentUser from "@/lib/session";

export default async function Home() {
  const user = await getCurrentUser();
  console.log(user, "user from db");

  return (
    <div className="h-screen flex items-center justify-center text-black">
      dashboard page
    </div>
  );
}
