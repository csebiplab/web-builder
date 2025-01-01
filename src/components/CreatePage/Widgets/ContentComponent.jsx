export default function ContentComponent({
  title,
  setTitle,
  setHtmlTag,
  htmlTag,
}) {
  return (
    <div className="max-w-md mx-auto">
      <label className="block text-sm font-medium text-gray-800 mb-2">
        Title
      </label>
      <textarea
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add Your Heading Text Here"
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <label className="block text-sm font-medium text-gray-800 mb-2">
        HTML Tag
      </label>
      <select
        value={htmlTag}
        onChange={(e) => setHtmlTag(e.target.value)}
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="h1">H1</option>
        <option value="h2">H2</option>
        <option value="h3">H3</option>
        <option value="h4">H4</option>
        <option value="h5">H5</option>
        <option value="h6">H6</option>
      </select>
    </div>
  );
}
