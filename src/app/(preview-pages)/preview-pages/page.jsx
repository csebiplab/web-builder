async function getData() {
  try {
    const response = await fetch("http://localhost:3000/api/pages", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    const data = await response.json();

    return data?.data;
  } catch (error) {
    console.log(error, "err");
    return null;
  }
}

export default async function page() {
  const data = await getData();

  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <main className="container">
      {data.map((page) => (
        <div key={page._id}>
          {page.designData.map((design) => (
            <section key={design.id} style={design.style}>
              {design.components.map((section) => {
                const SectionTag = section.htmlTag || "div";
                return (
                  <SectionTag
                    key={section.id}
                    className={section.style.classname}
                    style={section.style.custom}
                  >
                    {section.content}
                  </SectionTag>
                );
              })}
            </section>
          ))}
        </div>
      ))}
    </main>
  );
}
