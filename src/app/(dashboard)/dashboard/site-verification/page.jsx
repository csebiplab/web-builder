import SiteVerificationComponent from "@/components/__dashboard/siteVerificationComponent/SiteVerificationComponent";

export async function getData() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${apiUrl}/api/blog`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data?.data;
}

export default async function SeoSiteVerification() {
  const siteVerification = await getData();
  return (
    <>
      <SiteVerificationComponent data={siteVerification} />
    </>
  );
}
