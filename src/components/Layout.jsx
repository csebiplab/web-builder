import Widgets from "./CreatePage/Widgets/Widgets";

export default function Layout({ children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Main Content Area */}
      <main style={{ flex: 1, display: "flex" }}>
        {/* Sidebar */}
        <aside
          style={{ width: "250px", background: "#f4f4f4", padding: "10px" }}
        >
          <Widgets />
        </aside>

        {/* Editor Area */}
        {/* <div style={{ flex: 1, padding: "20px", background: "#fff" }}>
          {children}
        </div> */}
      </main>
    </div>
  );
}
