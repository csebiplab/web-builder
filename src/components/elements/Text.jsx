export default function Text({ element }) {
  return (
    <div style={element.styles} contentEditable suppressContentEditableWarning>
      {element.content}
    </div>
  );
}
