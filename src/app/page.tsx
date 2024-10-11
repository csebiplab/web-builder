import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center text-white">
      <p className="text-2xl">
        Please{" "}
        <Link
          href="/signin"
          className="underline text-primary-600 font-extrabold"
        >
          Login
        </Link>{" "}
        First To Enter
      </p>
    </div>
  );
}
