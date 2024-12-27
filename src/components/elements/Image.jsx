export default function Image({ element }) {
  return <img src={element.content} alt="Dynamic" style={element.styles} />;
}
