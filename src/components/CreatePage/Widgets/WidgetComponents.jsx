export default function WidgetComponents({ widgets }) {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Widgets</h2>
      <div className="flex flex-col gap-4">
        {widgets.map((widget) => (
          <div
            key={widget.type}
            draggable
            onDragStart={(e) =>
              e.dataTransfer.setData("widgetType", widget.type)
            }
            className="flex items-center gap-2 p-2 bg-white shadow hover:shadow-lg cursor-pointer border rounded"
          >
            {widget.icon}
            <span>{widget.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
